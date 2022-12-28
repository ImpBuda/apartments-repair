package com.example.repairapapartment.controllers;

import com.example.repairapapartment.models.Advert;
import com.example.repairapapartment.models.AdvertImage;
import com.example.repairapapartment.services.AdvertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdvertController {

    private final AdvertService advertService;

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
}
