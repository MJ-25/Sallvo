package com.codeoftheweb.salvo.controllers;

import com.codeoftheweb.salvo.models.GamePlayer;
import com.codeoftheweb.salvo.models.Salvo;
import com.codeoftheweb.salvo.repositories.GamePlayerRepository;
import com.codeoftheweb.salvo.repositories.SalvoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SalvosController {
@Autowired
private PasswordEncoder passwordEncoder;
@Autowired
private SalvoRepository salvoRepository;
@Autowired
private GamePlayerRepository gamePlayerRepository;


@RequestMapping(value= "/games/players/{gamePlayerId}/salvos", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> addSalvos (@PathVariable long gamePlayerId, @RequestBody Salvo salvos, Authentication authentication){
    if (isGuest(authentication)) {
        return new ResponseEntity<>(makeMap("error", "You must log in!"), HttpStatus.UNAUTHORIZED);
    }
    GamePlayer gamePlayer = gamePlayerRepository.findById(gamePlayerId).orElse(null);

    if(gamePlayer == null) {
        return new ResponseEntity<Map<String, Object>>(makeMap("error", "Game Player doesn't exist"), HttpStatus.UNAUTHORIZED);

    }

    if(gamePlayer.getPlayer().getUserName() != authentication.getName()){
        return  new ResponseEntity<Map<String, Object>>(makeMap("error", "This is not your Game Player"), HttpStatus.UNAUTHORIZED);
    }
    if (gamePlayer.getSalvoes().size() > 5){
        return new ResponseEntity<Map<String, Object>>(makeMap("error", "You already have salvoes"), HttpStatus.FORBIDDEN);
    }


    salvos.setGamePlayer(gamePlayer);
        salvoRepository.save(salvos);

    return new ResponseEntity<Map<String, Object>>(makeMap("OK", "Salvoes created"), HttpStatus.CREATED);
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
