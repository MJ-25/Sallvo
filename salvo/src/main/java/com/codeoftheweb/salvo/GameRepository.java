package com.codeoftheweb.salvo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Date;


public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByGameTime (Date gameTime);
}
