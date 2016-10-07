/*
 * Copyright (c) 2014 General Electric Company. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * General Electric Company. The software may be used and/or copied only
 * with the written permission of General Electric Company or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */
package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ge.dsv.controllers.BaseApplicationController;
import play.Logger;
import play.libs.Json;
import play.mvc.Result;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * The DashboardController sets up handlers for all the "configurable dashboard"-specific routes.
 */
//@With(SessionManager.class)
//@Security.Authenticated(Secured.class)
public class DashboardController extends BaseApplicationController
{
    private final static String DATA_DIRECTORY = "fake-data";
    private final static String CONTEXT_DIRECTORY = "fake-context-tree";
    private final static String CONTEXT_METADATA_DIRECTORY = "fake-context-metadata";
    private final static  String VIEW_DIRECTORY = "fake-views";

    /**
     * Returns the entire context tree for the configurable dashboard.
     * This is a mocked method which reads the fake context json file and return it as json.
     * 
     * @return the context tree json object
     */
    public static Result getContextTree(String id)
    {
        Path mockDataFile = Paths.get(CONTEXT_DIRECTORY, id+".json");
        Logger.debug("Reading the context file: " + mockDataFile.toAbsolutePath().toString());

        StringBuilder jsonString = new StringBuilder();

        Charset charset = Charset.forName("US-ASCII");
        try (BufferedReader reader = Files.newBufferedReader(mockDataFile, charset))
        {
            String line = null;
            while ((line = reader.readLine()) != null)
            {
                jsonString.append(line);
            }
        }
        catch (IOException e)
        {
            Logger.error("Problems reading the fake context file " + mockDataFile.toAbsolutePath().toString());
            Logger.error("Assuming that you don't want a child there...");
            return ok(Json.parse("[]"));
        }

        try
        {
            JsonNode json = Json.parse(jsonString.toString());
            return ok(json);
        }
        catch (Exception e)
        {
            Logger.error("Problems parsing the json string.");
            Logger.error(e.getMessage());
            return badRequest();
        }

    }

    private static Result readAndReturnData(Path mockDataFile) {
        Logger.debug("Reading the file: " + mockDataFile.toAbsolutePath().toString());

        StringBuilder jsonString = new StringBuilder();

        Charset charset = Charset.forName("US-ASCII");
        try (BufferedReader reader = Files.newBufferedReader(mockDataFile, charset))
        {
            String line = null;
            while ((line = reader.readLine()) != null)
            {
                jsonString.append(line);
            }
            JsonNode json = Json.parse(jsonString.toString());
            return ok(json);
        }
        catch (Exception e)
        {
            Logger.error(e.getMessage());
            return badRequest();
        }
    }

    /**
     * Returns mock datagrid data.
     *
     * @return mock datagrid json
     */
    public static Result getMockDatagridData()
    {
        String dataSet = request().getQueryString("dataSet");
        Path mockDataFile = Paths.get(DATA_DIRECTORY, "mock-datagrid-data" + dataSet + ".json");
        return readAndReturnData(mockDataFile);
    }

    public static Result getMockDatagridData2()
    {
        Path mockDataFile = Paths.get(DATA_DIRECTORY, "mock-datagrid-dataB.json");
        return readAndReturnData(mockDataFile);
    }

    /**
     * Returns mock hello world data.
     *
     * @return mock hello world json
     */
    public static Result getMockHelloWorldData()
    {
        Path mockDataFile = Paths.get(DATA_DIRECTORY, "mock-helloworld-data.json");
        return readAndReturnData(mockDataFile);
    }

    /**
     * Returns mock time series data.
     *
     * @return mock time series json
     */
    public static Result getMockTimeSeriesData()
    {
        String filename = "mock-timeseries-data2.json";
        if(request().getQueryString("samplingRate").equals("4 hours")) {
            filename = "mock-timeseries-data1.json";
        }
        else if(request().getQueryString("samplingRate").equals("24 hours")) {
            filename = "mock-timeseries-data3.json";
        }
        Path mockDataFile = Paths.get(DATA_DIRECTORY, filename);
        return readAndReturnData(mockDataFile);
    }

    public static Result getMockTimeSeriesData2()
    {
        String filename = "mock-timeseries-dataB.json";
        Path mockDataFile = Paths.get(DATA_DIRECTORY, filename);
        return readAndReturnData(mockDataFile);
    }

    /**
     * Returns mock context meta data
     * This is a mocked method which reads the fake context metadata json file and return it as json.
     *
     * @return the context metadata json object
     */
    public static Result getContextMetadata(String contextId)
    {
        String filename = "all-context-meta.json";
        if(contextId.equalsIgnoreCase("001-1-1-2")) {
            filename = "no-meta.json";
        }
        else if (contextId.equalsIgnoreCase("001-5")){
            return badRequest();
        }

        Path mockDataFile = Paths.get(CONTEXT_METADATA_DIRECTORY, filename);
        return readAndReturnData(mockDataFile);
    }


    /**
     * Returns mock view
     * This is a mocked method which reads the fake view json file and return it as json.
     *
     * @return view json object
     */
    public static Result getView(String contextId)
    {
        String filename = "all-widgets-view.json";
        if (contextId.equalsIgnoreCase("001-2-2-1-1") || contextId.equalsIgnoreCase("001-1-1-2")){
            filename = "no-view.json";
        }
        else if (contextId.equalsIgnoreCase("001-2-2-1-2")){
            filename = "single-view.json";
        }
        else if (contextId.equalsIgnoreCase("001-6")){
            return badRequest();
        }

        Path mockDataFile = Paths.get(VIEW_DIRECTORY, filename);
        return readAndReturnData(mockDataFile);
    }

    /**
     * Returns 200 for success and 400 for error
     * This method to mock delete view request
     *
     * @return
     */
    public static Result deleteView(String contextId, String viewId)
    {
        if (viewId.equalsIgnoreCase("context.undeletable")){
            return badRequest();
        }
        else{
            return ok();
        }
    }

    /**
     * Returns created view
     * This is a mocked method which reads the fake view json file and return it as json.
     *
     * @return view json object
     */
    public static Result createView(String contextId)
    {
        ObjectNode json = (ObjectNode) request().body().asJson();
        json.put("id", System.currentTimeMillis());
        if(contextId.equalsIgnoreCase("001-4")) {
            return badRequest("Cannot Create View");
        } else {
            return ok(json);
        }
    }

    /**
     * Returns updated view
     * This is a mocked method which simulate update view and return a view when view id is not updatable
     *
     * @return view json object
     */
    public static Result updateView(String contextId, String viewId)
    {
        JsonNode json = request().body().asJson();
        if (viewId.equalsIgnoreCase("context.notupdatable")){
            return badRequest();
        }
        else{
            return ok(json);
        }
    }
}
