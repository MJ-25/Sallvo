package com.codeoftheweb.salvo;
import com.sun.javafx.collections.MappingChange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping ("/api")
public class SalvoController {
        @Autowired
        private GameRepository repo;

@RequestMapping("/games")
    public List <Object> getGameID(){
    return repo.findAll().stream().map(e -> mapa(e)).collect(Collectors.toList());
}

private Map<String, Object> mapa(Game e){
    Map <String, Object> obj = new LinkedHashMap<>();
    obj.put("id", e.getId());
    obj.put("created",e.getGameTime());
    obj.put("gamePlayers",getGamePlayersDetail(e.getGamePlayers()));

    return obj;
}

private Set<Object> getGamePlayersDetail(Set <GamePlayer> o){
    return o.stream().map(n-> mapaDeGamePlayers(n)).collect(Collectors.toSet());
}


private Map <String, Object> mapaDeGamePlayers(GamePlayer n){
    Map <String, Object> obj = new LinkedHashMap<>();
    obj.put("id", n.getId());
    return obj;
}

}
