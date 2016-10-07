package controllers;

import org.apache.http.HttpHeaders;
import org.apache.http.HttpStatus;
import play.Logger;
import play.Play;
import play.libs.ws.WSRequestHolder;
import play.mvc.Http;


import javax.security.sasl.AuthenticationException;
import java.util.Map;
import java.util.Set;

/**
 * Created by Pavan Aripirala Venkata on 3/26/15.
 */
public final class ControllerHelper {

    public static final String CONF_HTTP_TIMEOUT_MSEC = "http.timeout.msec";
    public static final String REQUEST_HEADER_SSO 			= "SM_SSOID";
    public static final String SMUSER_HEADER = "SM_USER";
    public static final String SESSION_SSO 					= "User-SSO";

    public static String getServiceBaseUri(String service) {
        HopperService hService = HopperService.valueOf(service);

        String serviceHost = Play.application().configuration().getString("data." + service + ".host_port");
        String baseURI = Play.application().configuration().getString("data." + service + ".base.uri");
        return serviceHost + baseURI;
    }

    public static void setHeaders(WSRequestHolder request, Map<String,String> headers) {
        request.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        request.setHeader(HttpHeaders.ACCEPT, "application/json");
        request.setHeader(HttpHeaders.CONTENT_LANGUAGE, "en-US");
        request.setHeader(HttpHeaders.ACCEPT_LANGUAGE, "en-US");

        // repopulate everything from session to request
        Set<String> reqHeaders = Http.Context.current().session().keySet();
        for (String headerKey : reqHeaders) {
            request.setHeader(headerKey, Http.Context.current().session().get(headerKey));
        }

        for (Map.Entry<String,String> e: headers.entrySet()) {
            if (e.getKey() != null && e.getValue() != null) {
                request.setHeader(e.getKey(), e.getValue());
            }
        }
    }

    public static void setHeadersJson(WSRequestHolder request, Map<String,String> headers, String smUserId, String uuid) {
        request.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        request.setHeader(HttpHeaders.ACCEPT, "application/json");
        request.setHeader(HttpHeaders.CONTENT_LANGUAGE, "en-US");
        request.setHeader(HttpHeaders.ACCEPT_LANGUAGE, "en-US");

        // repopulate everything from session to request
        Set<String> reqHeaders = Http.Context.current().session().keySet();
        for (String headerKey : reqHeaders) {
            request.setHeader(headerKey, Http.Context.current().session().get(headerKey));
        }

        for (Map.Entry<String,String> e: headers.entrySet()) {
            if (e.getKey() != null && e.getValue() != null) {
                request.setHeader(e.getKey(), e.getValue());
            }
        }
        Logger.debug("uuid in setHeaders: " + uuid);
        request.setHeader("uuid", uuid);
        request.setHeader("sm_userid", smUserId);
    }

    public static void setHeaders(WSRequestHolder request, Map<String,String> headers, String smUserId, String uuid) {
        request.setHeader(HttpHeaders.CONTENT_LANGUAGE, "en-US");
        request.setHeader(HttpHeaders.ACCEPT_LANGUAGE, "en-US");

        // repopulate everything from session to request
        Set<String> reqHeaders = Http.Context.current().session().keySet();
        for (String headerKey : reqHeaders) {
            request.setHeader(headerKey, Http.Context.current().session().get(headerKey));
        }

        for (Map.Entry<String,String> e: headers.entrySet()) {
            if (e.getKey() != null && e.getValue() != null) {
                request.setHeader(e.getKey(), e.getValue());
            }
        }
        Logger.debug("uuid in setHeaders of: " + uuid + ";; smUserId = " + smUserId);
        request.setHeader("uuid", uuid);
        request.setHeader("sm_userid", smUserId);
    }

    public static void setQueryParams(WSRequestHolder request, Map<String,String[]> params) {
        for (Map.Entry<String,String[]> e: params.entrySet()) {
            if (e.getKey() != null && e.getValue() != null) {
                request.setQueryParameter(e.getKey(), e.getValue()[0]);
            }
        }
    }

    public static boolean isOK(int status) {
        return status >= HttpStatus.SC_OK && status < HttpStatus.SC_MULTIPLE_CHOICES;
    }

    public static long getHttpTimeout() {
        return Play.application().configuration().getLong(CONF_HTTP_TIMEOUT_MSEC);
    }

    public static String getUserId(Http.Context ctx) throws AuthenticationException {
        String requestSSO = ctx.request().getHeader(REQUEST_HEADER_SSO);
        String smUser = ctx.request().getHeader(SMUSER_HEADER);
        String sessionSSO = ctx.session().get(SESSION_SSO);

        Logger.debug("SESSION_SSO: " + sessionSSO + "; REQUEST_HEADER_SSO: " + requestSSO + "; SMUSER_HEADER: " + smUser);

        if ((requestSSO == null || requestSSO.trim().isEmpty()) &&
                (null == smUser || smUser.trim().isEmpty()) ) {
            Logger.debug("SSO missing in request header : '" + REQUEST_HEADER_SSO + "'");
            throw new AuthenticationException("Unauthorized! Please Authenticate.");
        }
        String userId = (null != requestSSO)?requestSSO:(null != smUser?smUser:null);
        return userId;
        /*
        if(sessionSSO != null && !sessionSSO.equalsIgnoreCase(requestSSO)) {
            Logger.debug("Unauthorized request from different sso. Please clear your cache.");
            return unauthorized("SSO is different from the original sso");
        }
        */
    }
}
