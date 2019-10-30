package com.codeoftheweb.salvo.controllers;

import com.codeoftheweb.salvo.models.Ship;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ShipController {
    @RequestMapping(value = "/games/players/{gpid}/ships", method = RequestMethod.POST)
    public ResponseEntity<Map> addShips(@PathVariable long gpid, @RequestBody List<Ship> ships, Authentication authentication) {
        if (isGuest(authentication)) {
            return new ResponseEntity<>(makeMap("error", "You must log in!"), HttpStatus.FORBIDDEN);
        }
      /*  ships.forEach(ship -> {
            ship.setGamePlayer(gamePlayer);
            shipRepository.save(ship);
        });*/
        return new ResponseEntity<>(makeMap("OK", "Ships created"), HttpStatus.CREATED);
    }

    private Map<String, Object> makeMap(String key, Object value) {
        Map<String, Object> map = new HashMap<>();
        map.put(key, value);
        return map;
    }


    private boolean isGuest(Authentication authentication) {
        return authentication == null || authentication instanceof AnonymousAuthenticationToken;
    }
}