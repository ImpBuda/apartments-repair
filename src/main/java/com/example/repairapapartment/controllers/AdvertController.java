package com.example.repairapapartment.controllers;

import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import com.example.repairapapartment.DTO.AdvertCardDTO;
import com.example.repairapapartment.models.Advert;
import com.example.repairapapartment.models.AdvertImage;
import com.example.repairapapartment.services.AdvertService;
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
public class AdvertController {

    @Autowired
    private ModelMapper modelMapper;

    private final AdvertService advertService;

    @GetMapping("/{id}")
    public Optional<Advert> getAdvert(@PathVariable Integer id){
        return advertService.findById(id);
    }

    @GetMapping("/getAdverts")
    public List<Advert> getAdverts(){
        return advertService.findAll();
    }

    @PostMapping(value = {"/create"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> saveAdvert(@RequestPart Advert advert, @RequestPart MultipartFile[] images){
        try{
            List<AdvertImage> advertImages = new ArrayList<>();

            for(MultipartFile image: images){
                AdvertImage advertImage = new AdvertImage(
                        image.getOriginalFilename(),
                        image.getContentType(),
                        image.getBytes()
                );
                advertImages.add(advertImage);
            }
            advert.setAdvertImages(advertImages);
            advertService.save(advert);
            return ResponseEntity.ok().build();
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    Converter<Advert, AdvertCardDTO> converter = new AbstractConverter<>() {
        @Override
        protected AdvertCardDTO convert(Advert source) {
            AdvertCardDTO destination = new AdvertCardDTO();
            List<AdvertImage> sourceSet = source.getAdvertImages();

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
    public Page<AdvertCardDTO> getAllAdverts(@RequestParam(defaultValue = "0") Integer pageNumber,
                                             @RequestParam(defaultValue = "12") Integer pageSize,
                                             @RequestParam(defaultValue = "desc") String sortDir,
                                             @RequestParam(required = false) String title){
        modelMapper.addConverter(converter);

        Page<Advert> page = advertService.findAllByQuery(title, pageNumber, pageSize, sortDir);

        return page.map(advert -> modelMapper.map(advert, AdvertCardDTO.class));
    }
}
