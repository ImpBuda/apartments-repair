package com.example.repairapapartment.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Advert {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "advert_seq")
    private Integer id;
    private String title;
    private String description;
    private Integer phone;
    private String category;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate createTime;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "advert_id")
    private List<AdvertImage> advertImages;

}
