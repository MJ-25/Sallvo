package com.codeoftheweb.salvo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import java.util.Date;


@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);
	}

/*	@Bean
	public CommandLineRunner initData(PlayerRepository playerRepository) {
		return (args) -> {
			// save a couple of players
			playerRepository.save(new Player("j.bauer@ctu.gov"));
			playerRepository.save(new Player("c.obrian@ctu.gov"));
			playerRepository.save(new Player("kim_bauer@gmail.com"));
			playerRepository.save(new Player("t.almeida@ctu.gov"));
		};
	}*/

	@Bean
	public CommandLineRunner initData(GameRepository gameRepository) {
		return (args) -> {
			Date date = new Date();
			Date unaHoraMas = Date.from(date.toInstant().plusSeconds(3600));
			Date dosHoraMas = Date.from(date.toInstant().plusSeconds(7200));


			gameRepository.save(new Game ());
			gameRepository.save(new Game (unaHoraMas));
			gameRepository.save(new Game (dosHoraMas));
		};
	}

}
