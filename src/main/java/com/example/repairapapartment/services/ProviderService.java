package com.example.repairapapartment.services;

import com.example.repairapapartment.models.Provider;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ProviderService {

    Page<Provider> findAllByQuery(String category, String title, Integer pageNumber, Integer pageSize, String sortDir);

    List<Provider> findAll();

    Optional<Provider> findById(Integer id);

    void save(Provider advert);

    void deleteById(Integer id);
}
