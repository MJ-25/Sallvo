package com.codeoftheweb.salvo.models;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Entity
public class Salvo {
@Id
@GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
@GenericGenerator(name = "native", strategy = "native")
private long id;
private long turn;

    public Map<Object, Object> makeSalvoDTO(){
        Map<Object, Object> dto = new LinkedHashMap<>();
        dto.put(this.getTurn(), this.makeTurnDto());
        return dto;
    }

    public Map<Object, Object> makeTurnDto(){
        Map<Object, Object> dto = new LinkedHashMap<>();
        dto.put(this.getGamePlayer().getGame().getGamePlayers()
                        .stream()
                        .map(gamePlayer1 -> gamePlayer1.makeGamePlayerDTO2())
                        .collect(Collectors.toList())
                ,this.getSalvoLocations());
        //dto.put(this.getGamePlayer().getPlayer().getId(),this.getSalvoLocations());
        return dto;
    }

@ElementCollection
@Column(name = "salvoLocation")
private List <String> salvoLocations;

@ManyToOne (fetch = FetchType.EAGER)
@JoinColumn(name = "gamePLayerId")
private GamePlayer gamePlayer;

    public Salvo() {
    }

    public Salvo(long turn, GamePlayer gamePlayer, List<String> salvoLocations) {
        this.turn = turn;
        this.gamePlayer = gamePlayer;
        this.salvoLocations = salvoLocations;
    }

    public long getId() {
        return id;
    }

    public long getTurn() {
        return turn;
    }

    public List<String> getSalvoLocations() {
        return salvoLocations;
    }

    public GamePlayer getGamePlayer() {
        return gamePlayer;
    }

    public void setTurn(long turn) {
        this.turn = turn;
    }

    public void setSalvoLocations(List<String> salvoLocations) {
        this.salvoLocations = salvoLocations;
    }

    public void setGamePlayer(GamePlayer gamePlayer) {
        this.gamePlayer = gamePlayer;
    }
}
