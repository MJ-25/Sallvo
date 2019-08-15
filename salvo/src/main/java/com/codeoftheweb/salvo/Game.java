package com.codeoftheweb.salvo;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity

public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private Date gameTime;

    @OneToMany(mappedBy="game", fetch=FetchType.EAGER)
    private List<GamePlayer> gamePlayers;

    public Game() {
    }

    public Game(Date gameTime) {
        this.gameTime = gameTime;
    }

    public long getId() {
        return id;
    }

    public Date getGameTime() {
        return gameTime;
    }
}
