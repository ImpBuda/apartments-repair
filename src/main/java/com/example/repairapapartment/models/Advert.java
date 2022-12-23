package com.example.repairapapartment.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Advert {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "advert_seq")
    private Integer id;
    private String title;
    private String description;
    private Integer phone;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate published;
    private String category;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "advert_id")
    private List<AdvertImage> advertImages;

}
