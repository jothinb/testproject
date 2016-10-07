package com.ge.transportation.oasisdemo.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ge.transportation.oasisdemo.dao.OASCraneDao;
import com.ge.transportation.oasisdemo.dao.OASCraneMovementDao;
import com.ge.transportation.oasisdemo.dao.OASLocationDao;
import com.ge.transportation.oasisdemo.dao.OASPositionDao;
import com.ge.transportation.oasisdemo.dao.OASShipperDao;
import com.ge.transportation.oasisdemo.dao.OASUnitDao;
import com.ge.transportation.oasisdemo.model.OASCrane;
import com.ge.transportation.oasisdemo.model.OASCraneMovement;
import com.ge.transportation.oasisdemo.model.OASLocation;
import com.ge.transportation.oasisdemo.model.OASPosition;
import com.ge.transportation.oasisdemo.model.OASShipper;
import com.ge.transportation.oasisdemo.model.OASUnit;
import com.ge.transportation.oasisdemo.service.util.ContainerUtil;

@RestController
@ComponentScan("com.ge.transportation.oasisdemo")

@RequestMapping(value = "/oasis-services")
public class DataAccessController {
	private Logger logger = LoggerFactory.getLogger(DataAccessController.class);
	
	@Autowired 
	private OASCraneDao craneDao;
	
	@Autowired
	private OASCraneMovementDao craneMovementDao;
	
    @Autowired
	private OASLocationDao locationDao;
	
	@Autowired 
	private OASUnitDao unitDao;
	
	@Autowired
	private OASPositionDao positionDao;
	
	@Autowired
	private OASShipperDao shipperDao;
	
	@RequestMapping(value = "/shipper", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<OASShipper> retrieveShippers() {
		// logger.debug("In DataAccessController::retrieveCranes");
		return shipperDao.findAll();
	}
	
	@RequestMapping(value = "/crane", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<OASCrane> retrieveCranes() {
		// logger.debug("In DataAccessController::retrieveCranes");
		return craneDao.findAll();
	}
	
	@RequestMapping(value = "/crane/position", method = RequestMethod.POST, produces = "application/json")
	public @ResponseBody OASCraneMovement savePosition(@RequestBody OASCraneMovement movement) {
		// logger.debug("In DataAccessController::savePosition");
		return craneMovementDao.saveUpdate(movement);
	}

	@RequestMapping(value = "/location/class/{classNum}", method = RequestMethod.GET, produces = "application/json")
	public List<OASLocation> retrieveLocationsByClass(@PathVariable("classNum") Integer classNum) {
		// logger.debug("In DataAccessController::retrieveLocationsByClass");
		return locationDao.findByClass(classNum);
	}
	
	@RequestMapping(value = "/location", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<OASLocation> retrieveLocations() {
		// logger.debug("In DataAccessController::retrieveLocations");
		return locationDao.findAll();
	}
	
	@RequestMapping(value = "/unit", method = RequestMethod.GET, produces = "application/json")
	public List<OASUnit> retrieveUnits() {
		// logger.debug("In DataAccessController::retrieveUnits");
		return unitDao.findAll();
	} 
	
	@RequestMapping(value = "/unit/type/{type}", method = RequestMethod.GET)
	public @ResponseBody List<OASUnit> retrieveUnitsByType(@PathVariable("type") String type, @RequestParam("location") String location) {
		logger.debug("In DataAccessController::retrieveUnitsByType");
		if("SLOT".equalsIgnoreCase(location)) {
			return ContainerUtil.generateContainerPosition(unitDao.findUnitsByType(type, location));
		} else if("ALL".equalsIgnoreCase(location)){
            List<OASUnit> units = unitDao.findUnitsByType(type, "STACK");
            units.addAll(ContainerUtil.generateContainerPosition(unitDao.findUnitsByType(type, "SLOT")));
            return units;
        } else {
            // default return units on the stack
            return unitDao.findUnitsByType(type, "STACK");
        }
	}
	
	@RequestMapping(value = "/unit/trainid/{trainId}", method = RequestMethod.GET)
	public @ResponseBody List<OASUnit> retrieveUnitsByTrainId(@PathVariable("trainId") Integer trainId) {
		// logger.debug("In DataAccessController::retrieveUnitsByTrainId");
		return unitDao.findUnitsByTrainId(trainId);
	} 
	
	@RequestMapping(value = "/unit/shipper/{shipper}", method = RequestMethod.GET)
	public @ResponseBody List<OASUnit> retrieveUnitsByShipper(@PathVariable("shipper") String shipper) {
		// logger.debug("In DataAccessController::retrieveUnitsByShipper");
		return unitDao.findUnitsByShipper(shipper);
	} 

	@RequestMapping(value = "/unit/shipto/{shiptocust}", method = RequestMethod.GET)
	public @ResponseBody List<OASUnit> retrieveUnitsByShipToCust(@PathVariable("shiptocust") String shiptocust) {
		// logger.debug("In DataAccessController::retrieveUnitsByShipToCust");
		return unitDao.findUnitsByShipToCust(shiptocust);
	} 
	
	@RequestMapping(value = "/position", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody List<OASPosition> retrievePositions() {
		// logger.debug("In Controller::retrievePositions");
		return positionDao.findAll();
	}
}
