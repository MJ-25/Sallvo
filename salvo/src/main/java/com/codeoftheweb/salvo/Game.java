package com.codeoftheweb.salvo;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity

public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private Date gameTime;

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
