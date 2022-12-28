import React from 'react';
import {CardActions, CardContent, CardMedia, Collapse, IconButton, TextField, Typography} from "@mui/material";
import "../css/searchspecialist.css"

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import img from "../images/kap.png"

const SearchSpecialists = () => {
    return (
        <div className="container-wrapper">
            <div className="header">
                <TextField className="searctField" id="outlined-basic" label="Поиск" variant="outlined" />
            </div>
            <Card sx={{ maxWidth: 250 }}>
                <CardHeader
                    avatar={
                        <Avatar  aria-label="recipe">R</Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={img}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
};

export default SearchSpecialists;