package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Film;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Film entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FilmRepository extends JpaRepository<Film, Long> {

    @Query("select film from Film film where film.user.login = ?#{principal.username}")
    List<Film> findByUserIsCurrentUser();

}
