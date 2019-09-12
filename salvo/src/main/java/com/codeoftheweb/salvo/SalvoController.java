package com.codeoftheweb.salvo;
//import com.sun.javafx.collections.MappingChange;
import com.codeoftheweb.salvo.models.Game;
import com.codeoftheweb.salvo.models.GamePlayer;
import com.codeoftheweb.salvo.models.Player;
import com.codeoftheweb.salvo.models.Ship;
import com.codeoftheweb.salvo.repositories.GamePlayerRepository;
import com.codeoftheweb.salvo.repositories.GameRepository;
//import com.sun.tools.javac.code.Scope;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping ("/api")
public class SalvoController {

        @Autowired
        private GameRepository repo;

        @Autowired
        private GamePlayerRepository gamePlayerRepository;

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

    @RequestMapping("/game_view/{nn}")
    public Map<String, Object> getGameViewByGamePlayerID(@PathVariable Long nn) {
    //The Request Mapping takes the gamePlayer Id as a parameter (the nn number)
        GamePlayer gamePlayer = gamePlayerRepository.findById(nn).get();

        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put("id",gamePlayer.getGame().getId());
        dto.put("created",gamePlayer.getGame().getGameTime());
       dto.put("gamePlayers", gamePlayer.getGame().getGamePlayers()
                .stream()
                .map(gamePlayer1 -> gamePlayer1.makeGamePlayerDTO())
                .collect(Collectors.toList())
        );
        dto.put("ships",gamePlayer.getShips()
                .stream()
                .map(ship1 -> ship1.makeShipDTO())
                .collect(Collectors.toList())
        );
        dto.put("salvoes", gamePlayer.getGame().getGamePlayers()
                .stream()
                //flatMap hace la misma función que map pero pone todos los elementos al mismo nivel (por ejemplo, un array con un solo objeto unido, en lugar de un array de varios objetos)
                .flatMap(gamePlayer1 -> gamePlayer1.getSalvoes()
                                                    .stream()
                                                    .map(salvo -> salvo.makeSalvoDTO()))
                .collect(Collectors.toList())
        );


        return dto;
    }

}
