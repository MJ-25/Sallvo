package com.codeoftheweb.salvo;

import com.codeoftheweb.salvo.models.*;
import com.codeoftheweb.salvo.repositories.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.Date;


@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(PlayerRepository playerRepository, GameRepository gameRepository, GamePlayerRepository gamePlayerRepository, ShipRepository shipRepository, SalvoRepository salvoRepository, ScoreRepository scoreRepository) {
		return (args) -> {
			// save a couple of players
			Player player1 = new Player("j.bauer@ctu.gov");
			Player player2 = new Player("c.obrian@ctu.gov");
			Player player3 = new Player("kim_bauer@gmail.com");
			Player player4 = new Player("t.almeida@ctu.gov");
			playerRepository.save(player1);
			playerRepository.save(player2);
			playerRepository.save(player3);
			playerRepository.save(player4);


			Date date = new Date();
			Date unaHoraMas = Date.from(date.toInstant().plusSeconds(3600));
			Date dosHoraMas = Date.from(date.toInstant().plusSeconds(7200));
			Game game1 = new Game(date);
			Game game2 = new Game(unaHoraMas);
			Game game3 = new Game(dosHoraMas);

			gameRepository.save(game1);
			gameRepository.save(game2);
			gameRepository.save(game3);


			GamePlayer gamePlayer1 = new GamePlayer(player1, game1);
			GamePlayer gamePlayer2 = new GamePlayer(player2, game1);
			GamePlayer gamePlayer3 = new GamePlayer(player2, game2);
			GamePlayer gamePlayer4 = new GamePlayer(player3, game3);

			gamePlayerRepository.save(gamePlayer1);
			gamePlayerRepository.save(gamePlayer2);
			gamePlayerRepository.save(gamePlayer3);
			gamePlayerRepository.save(gamePlayer4);


			String carrier = "Carrier";
			String battleship = "Battleship";
			String submarine = "Submarine";
			String destroyer = "Destroyer";
			String patrolBoat = "Patrol Boat";
			Ship ship1 = new Ship(gamePlayer1, destroyer, Arrays.asList("H2", "H3", "H4"));
			Ship ship2 = new Ship(gamePlayer1, submarine, Arrays.asList("E1", "F1", "G1"));
			Ship ship3 = new Ship(gamePlayer1, patrolBoat, Arrays.asList("B4", "B5"));
			Ship ship4 = new Ship(gamePlayer2, destroyer, Arrays.asList("B5", "C5", "D5"));
			Ship ship5 = new Ship(gamePlayer2, patrolBoat, Arrays.asList("F1", "F2"));
			Ship ship6 = new Ship(gamePlayer3, destroyer, Arrays.asList("B5", "C5", "D5"));
			Ship ship7 = new Ship(gamePlayer3, patrolBoat, Arrays.asList("C6", "C7"));
			Ship ship8 = new Ship(gamePlayer4, submarine, Arrays.asList("A2", "A3", "A4"));
			Ship ship9 = new Ship(gamePlayer4, patrolBoat, Arrays.asList("G6", "H6"));



			shipRepository.save(ship1);
			shipRepository.save(ship2);
			shipRepository.save(ship3);
			shipRepository.save(ship4);
			shipRepository.save(ship5);
			shipRepository.save(ship6);
			shipRepository.save(ship7);
			shipRepository.save(ship8);
			shipRepository.save(ship9);


			Salvo salvo1 = new Salvo(1, gamePlayer1,Arrays.asList("B5","C5","F1"));
			Salvo salvo2 = new Salvo(1, gamePlayer2,Arrays.asList("B4","B5","B6"));
			Salvo salvo3 = new Salvo(2, gamePlayer1,Arrays.asList("A2","A4","G6"));
			Salvo salvo4 = new Salvo(2, gamePlayer2,Arrays.asList("E1","H3","A2"));
			Salvo salvo5 = new Salvo(1, gamePlayer2,Arrays.asList("B4","B5","B6"));
			Salvo salvo6 = new Salvo(1, gamePlayer2,Arrays.asList("B4","B5","B6"));
			Salvo salvo7 = new Salvo(1, gamePlayer2,Arrays.asList("B4","B5","B6"));
			Salvo salvo8 = new Salvo(1, gamePlayer2,Arrays.asList("B4","B5","B6"));
			Salvo salvo9 = new Salvo(1, gamePlayer2,Arrays.asList("B4","B5","B6"));
			Salvo salvo10 = new Salvo(1, gamePlayer2,Arrays.asList("B4","B5","B6"));

			salvoRepository.save(salvo1);
			salvoRepository.save(salvo2);
			salvoRepository.save(salvo3);
			salvoRepository.save(salvo4);


			Score score1 = new Score(1,game1,player1);
			Score score2 = new Score(0.5,game2,player2);
			Score score3 = new Score(1, game3,player1);


			scoreRepository.save(score1);
			scoreRepository.save(score2);
			scoreRepository.save(score3);
		};
	}
}


