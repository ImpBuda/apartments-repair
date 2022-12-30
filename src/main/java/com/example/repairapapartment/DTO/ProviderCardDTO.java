package com.example.repairapapartment.DTO;

import com.example.repairapapartment.models.ProviderImage;
import lombok.Data;

@Data
public class ProviderCardDTO {

        private long id;
        private String title;
        private String category;
        private ProviderImage advertImage;
}
