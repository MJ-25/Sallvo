package com.codeoftheweb.salvo;
//import com.sun.javafx.collections.MappingChange;
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

@RequestMapping("/games")//Cuando escriban /api/game me va a dar una lista de objetos llamada "getGameID" que la va a encontrar en el repo (GameRepository)
// y va a devolver todos los objetos en forma de stream (para poder usar las funciones propias de un stream, tales como map), los va a mapear aplicando la función mapa y luego los va a coleccionar en una lista
    public List <Object> getGameIDDetails(){
    return repo.findAll().stream().map(e -> mapaDeGames(e)).collect(Collectors.toList());
}

//En un Map (diferente de la función map) vamos a poner String (los key, por ejemplo "nombre:") y Objetos (por ejemplo "Juan Manuel"). Este Map se llama mapa y toma como parámetro el Game (hay que especificar el tipo de variable) e (viene del map anterior)
private Map<String, Object> mapaDeGames(Game e){
    Map <String, Object> obj = new LinkedHashMap<>();
//Put in the Object "obj" the following keys (e.g. "id") and values (e.g. "e.getID"). We get the method from the Game class (it's the getter of id)
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
    obj.put("player", mapaDePlayers(n.getPlayer()));
    return obj;
}

private Map<String,Object> mapaDePlayers(Player n){
    Map <String, Object> obj = new LinkedHashMap<>();
    obj.put("id", n.getId());
    obj.put("email", n.getUserName());
    return obj;
}

}
