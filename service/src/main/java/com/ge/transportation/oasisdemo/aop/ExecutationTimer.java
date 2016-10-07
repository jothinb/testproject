package com.ge.transportation.oasisdemo.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Aspect
@Component
public class ExecutationTimer {
	private Logger logger = LoggerFactory.getLogger(ExecutationTimer.class);

    @Pointcut("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public void requestMapping() {}

    @Pointcut("execution(* com.ge.transportation.oasisdemo.*.*(..))")
    public void methodPointcut() {}

    @Around("requestMapping() && methodPointcut()")
    public Object profile(ProceedingJoinPoint pjp) throws Throwable {
        StopWatch sw = new StopWatch();
        String name = pjp.getSignature().getName();
        try {
            sw.start();
            return pjp.proceed();
        } finally {
            sw.stop();
            logger.info("STOPWATCH: " + sw.getTotalTimeMillis() + "ms - " + name);
        }
    }
}
