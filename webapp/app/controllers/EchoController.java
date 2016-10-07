package controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import play.Logger;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.WebSocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * The echo method just echos everything passed to it, and the slave method returns whatever it's told to.
 *
 * Mostly useful for testing the WS API
 *
 * @author 204054399
 */
public class EchoController extends Controller
{
    @BodyParser.Of(BodyParser.Raw.class)
    public static Result echo()
    {
        Echo echo = new Echo();
        echo.method = request().method();
        echo.headers = request().headers();
        echo.queryString = request().queryString();
        echo.version = request().version();
        echo.host = request().host();
        echo.remoteAddress = request().remoteAddress();
        echo.uri = request().uri();
        echo.path = request().path();
        echo.session = new HashMap<String, String>(session());
        echo.flash = new HashMap<String, String>(flash());
        echo.body = request().body().asRaw().asBytes();

        String accept = echo.headers.get(ACCEPT)[0];
        return respondAcceptably(accept, echo);
    }

    /**
     * Returns the echo as the proper content type based on the accept header of the request.
     *
     * @param accept Accept header value
     * @param echo Echo to return
     * @return
     */
    private static Result respondAcceptably(String accept, Echo echo)
    {
        return ok(Json.toJson(echo));
    }

    public static class Echo
    {
        public String                method;
        public Map<String, String[]> headers;
        public Map<String, String[]> queryString;
        public String                version;
        public String                host;
        public String                remoteAddress;
        public String                uri;
        public String                path;
        public Map<String, String>   session;
        public Map<String, String>   flash;
        public byte[]                body;
    }
}
