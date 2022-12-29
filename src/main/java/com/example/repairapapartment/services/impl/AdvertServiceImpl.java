package com.example.repairapapartment.services.impl;

import com.example.repairapapartment.models.Advert;
import com.example.repairapapartment.repositories.AdvertRepository;
import com.example.repairapapartment.services.AdvertService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdvertServiceImpl implements AdvertService {

    private final AdvertRepository advertRepository;

    private static final ExampleMatcher SEARCH_CONDITIONS_MATCH_ALL = ExampleMatcher
            .matching()
            .withMatcher("title", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
            .withIgnorePaths("id", "description", "phone", "category", "advertImages");

    @Override
    public Page<Advert> findAllByQuery(String title, Integer pageNumber, Integer pageSize, String sortDir){

        if(title == null)
            title = "";

        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.fromString(sortDir), "createTime"));

        Advert advert = Advert.builder()
                .title(title)
                .build();

        Example<Advert> example = Example.of(advert, SEARCH_CONDITIONS_MATCH_ALL);

        return advertRepository.findAll(example, paging);
    }

    public List<Advert> findAll(){
        return advertRepository.findAll();
    }

    @Override
    public Optional<Advert> findById(Integer id) {
        return advertRepository.findById(id);
    }

    @Transactional
    public void save(Advert advert){
        advertRepository.save(advert);
    }

    public void deleteById(Integer id){
        advertRepository.deleteById(id);
    }
}
