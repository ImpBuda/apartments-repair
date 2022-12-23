package com.example.repairapapartment.repositories;

import com.example.repairapapartment.models.Advert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdvertRepository extends JpaRepository<Advert, Integer> {
}
