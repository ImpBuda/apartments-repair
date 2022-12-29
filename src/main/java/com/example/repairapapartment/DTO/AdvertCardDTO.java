package com.example.repairapapartment.DTO;

import com.example.repairapapartment.models.AdvertImage;
import lombok.Data;

@Data
public class AdvertCardDTO {

        private long id;
        private String title;
        private String category;
        private AdvertImage advertImage;
}
