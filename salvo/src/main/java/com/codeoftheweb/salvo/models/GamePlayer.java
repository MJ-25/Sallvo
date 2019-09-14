package com.codeoftheweb.salvo.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
public class GamePlayer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;

    private Date joinTime;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="player_id")
    private Player player;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="game_id")//Agregar columna con este nombre
    private Game game;

    @OneToMany(mappedBy="gamePlayer", fetch=FetchType.EAGER)
    private Set<Ship> ships;

    @OneToMany(mappedBy = "gamePlayer", fetch = FetchType.EAGER)
    private Set<Salvo> salvoes;

    public GamePlayer() {
    }

    public GamePlayer(Player player, Game game) {
        this.joinTime = new Date();
        this.player = player;
        this.game = game;
    }


    public long getId() {
        return id;
    }

    public Date getjoinTime() {
        return this.joinTime;
    }

    @JsonIgnore
    public Player getPlayer() {
        return this.player;
    }
    @JsonIgnore
    public Game getGame() {
        return this.game;
    }


    public void setPlayer(Player player) {
        this.player = player;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    @JsonIgnore
    public Set<Ship> getShips() { return ships; }

    public void setShips(Set<Ship> ships) { this.ships = ships; }

    @JsonIgnore
    public Set<Salvo> getSalvoes() {
        return salvoes;
    }

    public void setSalvoes(Set<Salvo> salvoes) {
        this.salvoes = salvoes;
    }

    public Map<String,Object> makeGamePlayerDTO(){
        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put("id", this.getId());
        dto.put("player", getPlayer().makePlayerDetail());
        return dto;
    }

}
