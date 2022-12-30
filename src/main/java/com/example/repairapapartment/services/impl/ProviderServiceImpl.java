package com.example.repairapapartment.services.impl;

import com.example.repairapapartment.models.Provider;
import com.example.repairapapartment.repositories.ProviderRepository;
import com.example.repairapapartment.services.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProviderServiceImpl implements ProviderService {

    private final ProviderRepository providerRepository;

    private static final ExampleMatcher SEARCH_CONDITIONS_MATCH_ALL = ExampleMatcher
            .matching()
            .withMatcher("title", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
            .withIgnorePaths("id", "description", "phone", "category", "advertImages");

    @Override
    public Page<Provider> findAllByQuery(String title, Integer pageNumber, Integer pageSize, String sortDir){

        if(title == null)
            title = "";

        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.fromString(sortDir), "createTime"));

        Provider advert = Provider.builder()
                .title(title)
                .build();

        Example<Provider> example = Example.of(advert, SEARCH_CONDITIONS_MATCH_ALL);

        return providerRepository.findAll(example, paging);
    }

    public List<Provider> findAll(){
        return providerRepository.findAll();
    }

    @Override
    public Optional<Provider> findById(Integer id) {
        return providerRepository.findById(id);
    }

    @Transactional
    public void save(Provider advert){
        providerRepository.save(advert);
    }

    public void deleteById(Integer id){
        providerRepository.deleteById(id);
    }
}
