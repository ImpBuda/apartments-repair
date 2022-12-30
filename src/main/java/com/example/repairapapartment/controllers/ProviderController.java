package com.example.repairapapartment.controllers;

import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import com.example.repairapapartment.DTO.ProviderCardDTO;
import com.example.repairapapartment.models.Provider;
import com.example.repairapapartment.models.ProviderImage;
import com.example.repairapapartment.services.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProviderController {

    @Autowired
    private ModelMapper modelMapper;

    private final ProviderService providerService;

    @GetMapping("/{id}")
    public Optional<Provider> getAdvert(@PathVariable Integer id){
        return providerService.findById(id);
    }

    @GetMapping("/getAdverts")
    public List<Provider> getAdverts(){
        return providerService.findAll();
    }

    @PostMapping(value = {"/create"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> saveAdvert(@RequestPart Provider advert, @RequestPart MultipartFile[] images){
        try{
            List<ProviderImage> advertImages = new ArrayList<>();

            for(MultipartFile image: images){
                ProviderImage advertImage = new ProviderImage(
                        image.getOriginalFilename(),
                        image.getContentType(),
                        image.getBytes()
                );
                advertImages.add(advertImage);
            }
            advert.setProviderImages(advertImages);
            providerService.save(advert);
            return ResponseEntity.ok().build();
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    Converter<Provider, ProviderCardDTO> converter = new AbstractConverter<>() {
        @Override
        protected ProviderCardDTO convert(Provider source) {
            ProviderCardDTO destination = new ProviderCardDTO();
            List<ProviderImage> sourceSet = source.getProviderImages();

            destination.setId(source.getId());
            destination.setCategory(source.getCategory());
            destination.setTitle(source.getTitle());

            if(sourceSet.size() != 0){
                destination.setAdvertImage(sourceSet.stream().findFirst().get());
            }

            return destination;
        }
    };

    @GetMapping("/search")
    public Page<ProviderCardDTO> getAllAdverts(@RequestParam(defaultValue = "0") Integer pageNumber,
                                               @RequestParam(defaultValue = "12") Integer pageSize,
                                               @RequestParam(defaultValue = "desc") String sortDir,
                                               @RequestParam(required = false) String title){
        modelMapper.addConverter(converter);

        Page<Provider> page = providerService.findAllByQuery(title, pageNumber, pageSize, sortDir);

        return page.map(advert -> modelMapper.map(advert, ProviderCardDTO.class));
    }
}
