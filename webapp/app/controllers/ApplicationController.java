/*
 * Copyright (c) 2013 General Electric Company. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * General Electric Company. The software may be used and/or copied only
 * with the written permission of General Electric Company or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

package controllers;

import java.io.ByteArrayOutputStream;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.File;
import java.io.FileInputStream;

import java.util.*;

import com.ning.http.multipart.StringPart;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpStatus;
import com.fasterxml.jackson.databind.JsonNode;
import com.ning.http.multipart.MultipartRequestEntity;
import com.ning.http.multipart.Part;
import com.ning.http.client.FluentCaseInsensitiveStringsMap;

import play.Play;
import play.Logger;
import play.libs.F;
import play.libs.F.Promise;
import play.libs.F.Function;
import play.libs.ws.WS;
import play.libs.ws.WSResponse;
import play.libs.ws.WSRequestHolder;
import play.mvc.Http;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Result;
import play.mvc.Results;
import play.mvc.WebSocket;
import play.mvc.Security;
import play.mvc.With;

import com.ge.dsv.session.SessionManager;
import com.ge.dsv.controllers.Secured;
import play.mvc.Controller;
import com.ge.dsv.controllers.DataController;

import views.html.app;

import com.ge.dsv.common.util.Util;

import javax.security.sasl.AuthenticationException;

import static controllers.ControllerHelper.*;

/**
 * Controllers are the connections between the view and model.
 * Use this controller or create your own to add view handlers and business-specific logic.
 */
//@With(SessionManager.class)
// these annotations enable authentication for the class
//@Security.Authenticated(Secured.class)
public class ApplicationController extends Controller
{
    public static final Map<String, String> NO_EXTRA_HEADERS = Collections.<String,String>emptyMap();
    private static final Map<String, String> FILE_UPLOAD_HEADERS = new HashMap<>();
    private static final Map<String, String> DEFAULT_HEADERS = new HashMap<>();

    static {
        FILE_UPLOAD_HEADERS.put("Content-Type", "multipart/form-data");
        FILE_UPLOAD_HEADERS.put("Accept", "application/json");
    }
    /**
     * The index page of your application.
     *
     * @return the rendered index page of your application
     */
    public static Result index()
    {
        // Kicks off internationalization support for your application
        Util.processRequestGlobalize(request(), Http.Context.current(), response());

        return ok(app.render());
    }

    /**
     * This method allows widgets to point to an external service by routing the url through
     * the data service package (this is necessary due to the "Same Origin Policy").
     *
     * URL's passed to this this method in the JSON body['url'] will NOT be encoded.
     * URL's must be encoded before passed into this proxy (using <code>encodeURI()</code> for example).
	 *
	 * @return JSON data from web service
     */
    public static Promise<Result> getProxy()
    {
		return DataController.getProxy();
    }

    public static Promise<Result> postProxy() {
		return DataController.postProxy();
    }

    public static Promise<Result> putProxy()
    {
		return DataController.putProxy();
    }

    public static Promise<Result> deleteProxy()
    {
		return DataController.deleteProxy();
    }

    public static WebSocket<String> webSocket()
    {
        return DataController.webSocket();
    }

	public static Result callGetService(String service, String uri) {
        printRequestHeaders(Http.Context.current(), request());
        String url = getServiceBaseUri(service) +"/" + uri;
		try {
            Logger.debug("########################################################################################################");
			Logger.debug("Inside Play callGetService Thread Id : "+ Thread.currentThread().getId() + " & Active Thread Count :  "+Thread.activeCount());
			Logger.debug("Started retrieving GET : " + url);
            WSRequestHolder wsReq = WS.url(url);
            String userId = null;
            try {
                userId = getUserId(Http.Context.current());
            } catch (AuthenticationException ae) {
                Logger.debug("No User Id from request... defaulting to request user");
                userId = request().username();
            }
            String uuid = "hopperui_" + userId + "_" + System.currentTimeMillis();
            setHeadersJson(wsReq, NO_EXTRA_HEADERS, userId, uuid);
			setQueryParams(wsReq, request().queryString());
			Promise<WSResponse> promise = wsReq.get();
			return mapAsyncGet(promise).get(getHttpTimeout());
//			return mapSyncGet(promise);
		}
		catch (Exception exception) {
			Logger.error("Error in retrieving GET data for URI: "+url, exception);
			Logger.debug("########################################################################################################");
			return internalServerError();
		}
	}

    private static void printRequestHeaders(Http.Context current, Http.Request request) {
        Map<String, String[]> headers =  request.headers();
        Set<Map.Entry<String, String[]>> headerSet =  headers.entrySet();
        Logger.debug("Number of headers = " + headerSet.size());
        Iterator<Map.Entry<String, String[]>> iter = headerSet.iterator();
        while(iter.hasNext()) {
            Map.Entry<String, String[]> me = iter.next();
            String headerName = me.getKey();
            String[] headerValues = me.getValue();
            Logger.debug("request headerName " + headerName + " " + (null != headerValues && headerValues.length > 0?headerValues[0]:"none"));
        }
        Set<Map.Entry<String, String>> sessionSet = Http.Context.current().session().entrySet();
        Iterator<Map.Entry<String, String>> siter = sessionSet.iterator();
        while(siter.hasNext()) {
            Map.Entry<String, String> me = siter.next();
            Logger.debug("The session key = " + me.getKey());
            Logger.debug("The session value = " + me.getValue());
        }
    }

    private static F.Promise<Result> mapAsyncGet(F.Promise<WSResponse> promiseResponse) {
        return
            promiseResponse.map(
                    new F.Function<WSResponse, Result>() {
                        public Result apply(WSResponse response) {
                            Logger.debug("Inside Play performAsyncGet Thread Id : "+ Thread.currentThread().getId() + " & Active Thread Count :  "+Thread.activeCount());
                            if (isOK(response.getStatus())) {
                                String rsBody = response.getBody();
                                if (rsBody != null && !rsBody.isEmpty()) {
                                    Logger.debug("Successful GET data retrieval for URI: "+response.getUri());
                                    return ok(rsBody);
                                } else {
                                    Logger.error("GET data retrieval for URI: "+response.getUri() + " failed with empty Response: ");
                                    return noContent();
                                }
                            } else {
                                Logger.error("GET data retrieval for URI: "+response.getUri() + " failed with Response: "+ response.getStatus());
                                Logger.debug("########################################################################################################");
                                return status(response.getStatus(), response.getBody());
                            }
                        }
                    }
            );
    }

    /**
     * A sample controller for file upload (Content-type="multipart/form-data")
     * This controller is just a helper controller which accepts the file, uploads it at the root directory and
     * returns a success.
     * Use this file object to do any processing with the uploaded file.
     */
    public static Result upload(String service)
    {
        String ingestionPath = Play.application().configuration().getString("data." + service + ".excel");
        String url = getServiceBaseUri(service) + ingestionPath;
        MultipartFormData body = request().body().asMultipartFormData();
        java.util.Map<java.lang.String,java.lang.String[]> reqParams = body.asFormUrlEncoded();
        if(null == reqParams.get("name") || reqParams.get("name").length == 0 || reqParams.get("name")[0].trim().length() == 0) {
            return badRequest("Name is required.");
        }
        if(null == reqParams.get("tableName") || reqParams.get("tableName").length == 0 || reqParams.get("tableName")[0].trim().length() == 0) {
            return badRequest("Table Name is required.");
        }
        String displayName = reqParams.get("name")[0].trim();
        String tableName = reqParams.get("tableName")[0].trim();
        String description = null;
        if(null != reqParams.get("description") && reqParams.get("description").length > 0) {
            description = reqParams.get("description")[0].trim();
        }
        Logger.debug("The displayName " + displayName);
        Logger.debug("The description " + description);

        if(null == body) {
            return badRequest("There is no input");
        }
         FilePart uploadedFile = body.getFile("uploadInput");

         if (uploadedFile != null) {
            List<String> errors = validate(uploadedFile, displayName, description);
             if(errors.size() > 0) {
                 Logger.error("Invalid Input: " + errors.get(0));
                 return badRequest("Invalid Input: " + errors.get(0));
             }
            String fileName = uploadedFile.getFilename();
         	String contentType = uploadedFile.getContentType();
         	File file = uploadedFile.getFile();

         	// Move file to new location
             //Logger.error("The absolute path " + play.Play.application().path().getAbsolutePath());
         	//file.renameTo(new File(play.Play.application().path().getAbsolutePath() + "/" + fileName));
            return callUploadService(url, uploadedFile, displayName, description, tableName);
         }
         else
         {
         return badRequest("No file uploaded.!!!!");
         }
        //return Results.TODO;
    }

    /**
     * @param url
     * @return
     * @since 1.0
     *
     */
    public static Result callUploadService(String url, FilePart uploadedFile, String displayName, String description, String tableName) {
        try {
            Logger.debug("********************************************************************************");
            Logger.debug("Started posting POST : "+url);
            // Build up the Multiparts
            List<Part> parts = new ArrayList<>();
            com.ning.http.multipart.FilePart filePart = new com.ning.http.multipart.FilePart("file", uploadedFile.getFile());
            //filePart.setContentType("multipart/form-data");
            parts.add(filePart);
            parts.add(new StringPart("fileName", uploadedFile.getFilename()));
            StringPart sp1 = new StringPart("name", displayName);
            //sp.setContentType("application/json");
            parts.add(sp1);
            if(null != description) {
                parts.add(new StringPart("description", description));
            }
            StringPart sp2 = new StringPart("tableName", tableName);
            //sp.setContentType("application/json");
            parts.add(sp2);

            Part[] partsA = parts.toArray(new Part[parts.size()]);

            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            FluentCaseInsensitiveStringsMap fluentMap = new FluentCaseInsensitiveStringsMap();
            // Add it to the MultipartRequestEntity
            MultipartRequestEntity reqE = new MultipartRequestEntity(partsA, fluentMap);
            reqE.writeRequest(bos);
            InputStream reqIS = new ByteArrayInputStream(bos.toByteArray());
            WSRequestHolder wsReq = WS.url(url);
            wsReq.setContentType(reqE.getContentType());
            String userId = null;
            try {
                userId = getUserId(Http.Context.current());
            } catch (AuthenticationException ae) {
                Logger.debug("No User Id from request... defaulting to request user");
                userId = request().username();
            }
            String uuid = "hopperui_" + userId + "_" + System.currentTimeMillis();
            setHeaders(wsReq, FILE_UPLOAD_HEADERS, userId, uuid);
            WSResponse response = wsReq.post(reqIS).get(getHttpTimeout());

            try {
                if (isOK(response.getStatus())) {
                    String rsBody = response.getBody();
                    if (rsBody != null && !rsBody.isEmpty()) {
                        Logger.debug("Successful UPLOAD data submission for URI: " + url);
                        Logger.debug("********************************************************************************");
                        return ok(rsBody);
                    } else {
                        Logger.error("POST data submission for URI: " + url + " failed with empty Response");
                        Logger.debug("********************************************************************************");
                        return noContent();
                    }
                } else {
                    Logger.error("POST data submission/retrieval for URI: " + url + " failed with Response: " + response.getStatus() + " response = " +  response.getBody());
                    Logger.debug("********************************************************************************");
                    return status(response.getStatus(), response.getBody());
                }
            } finally {
                /*Logger.debug("Closing file input stream");
                if(null != fis) {
                    fis.close();
                }*/
            }
        }
        catch (Exception exception) {
            Logger.error("Error in submitting/retrieving POST data for URI: "+url, exception);
            Logger.debug("********************************************************************************");
            return internalServerError();
        }
    }

    /**
     * @param uri
     * @return
     * @since 1.0
     *
     */
    public static Result callPostService(String service, String uri) {
        try {
            Logger.debug("********************************************************************************");
            Logger.debug("Started posting POST : " + uri + " request body " + request().body());
            WSRequestHolder wsReq = WS.url(getServiceBaseUri(service) + "/" + uri);
            String userId = null;
            try {
                userId = getUserId(Http.Context.current());
            } catch (AuthenticationException ae) {
                Logger.debug("No User Id from request... defaulting to request user");
                userId = request().username();
            }
            String uuid = "hopperui_" + userId + "_" + System.currentTimeMillis();
            setQueryParams(wsReq, request().queryString());
            setHeadersJson(wsReq, NO_EXTRA_HEADERS, userId, uuid);
            JsonNode json = request().body().asJson();

            if (json == null) {
                Logger.error("POST data submission/retrieval for URI: "+uri + " failed with null JSON POST payload: " + request().body());
                Logger.debug("********************************************************************************");
                return badRequest("Expecting Json POST data");
            }
            WSResponse response = wsReq.post(json.toString()).get(getHttpTimeout());
            if (isOK(response.getStatus())) {
                String rsBody = response.getBody();
                if (rsBody != null && !rsBody.isEmpty()) {
                    Logger.debug("Successful POST data submission/retrieval for URI: "+uri);
                    Logger.debug("rsBody = " + rsBody);
                    Logger.debug("********************************************************************************");
                    return ok(rsBody);
                } else {
                    Logger.error("POST data submission/retrieval for URI: "+uri + " failed with empty Response");
                    Logger.debug("********************************************************************************");
                    return noContent();
                }
            } else {
                Logger.error("POST data submission/retrieval for URI: "+uri + " failed with Response: "+ response.getStatus());
                Logger.debug("********************************************************************************");
                return status(response.getStatus(), response.getBody());
            }
        }
        catch (Exception exception) {
            Logger.error("Error in submitting/retrieving POST data for URI: "+uri, exception);
            Logger.debug("********************************************************************************");
            return internalServerError();
        }
    }

    private static List<String> validate(FilePart uploadedFile, String displayName, String description) {
        List<String> errors = new ArrayList<>();
        File file = uploadedFile.getFile();
        if(null == displayName || "".equals(displayName.trim())) {
            errors.add("Display name is required");
        }
        if(null == file) {
            errors.add("File is required");
        }
        return errors;
    }
}
