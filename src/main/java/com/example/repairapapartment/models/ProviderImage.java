package com.example.repairapapartment.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "providerImage")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProviderImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "advert_image_seq")
    private Integer id;

    private String name;

    private String type;

    @Lob
    @Column(name = "image_data")
    private byte[] imageData;


    public ProviderImage(String name, String type, byte[] imageData) {
        this.name = name;
        this.type = type;
        this.imageData = imageData;
    }
}
