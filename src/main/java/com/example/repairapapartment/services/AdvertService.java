package com.example.repairapapartment.services;

import com.example.repairapapartment.models.Advert;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface AdvertService {

    Page<Advert> findAllByQuery(String title, Integer pageNumber, Integer pageSize, String sortDir);

    List<Advert> findAll();

    Optional<Advert> findById(Integer id);

    void save(Advert advert);

    void deleteById(Integer id);
}
