import React from 'react'
import { View, Text } from 'react-native'
import { FullMovie } from '../../../core/entities/movie.entity';
import { Cast } from '../../../core/entities/cast.entity';
import { Formatter } from '../../../config/helpers/formatter';
import { FlatList } from 'react-native-gesture-handler';
import { CastActor } from '../cast/CastActor';

interface Props {
    movie: FullMovie;
    cast: Cast[];
}
export const MovieDetails = ({movie, cast}:Props) => {
  return (
    <>
        {
        movie && 
        <View style={{marginHorizontal: 20}}>
            <View style={{flexDirection: 'row'}}>
                <Text>{movie.rating}</Text>
                <Text style={{marginLeft: 5}}>
                    - {movie.genres.join(', ')}
                </Text>
            </View>
            <View>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Historia</Text>
                <Text style={{fontSize: 16, marginBottom: 5}}>{movie.description}</Text>
            </View>
            <View>
                <Text style={{fontSize: 23, fontWeight: 'bold', marginVertical: 10}}>Presupuesto</Text>
                <Text style={{fontSize: 18, fontWeight: '500', marginVertical: 10}}>{Formatter.currency(movie.budget ? movie.budget : 0)}</Text>
            </View>
            <View>
                <Text style={{fontSize: 23, fontWeight: 'bold', marginVertical: 10}}>Duración</Text>
                <Text style={{fontSize: 18, fontWeight: '500', marginVertical: 10}}>{movie.duration} minutos</Text>
            </View>
            <View>
                <Text style={{fontSize: 23, fontWeight: 'bold', marginVertical: 10}}>Actores</Text>
                <FlatList 
                data={cast}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) =>
                    <CastActor actor={item} />
                }
                />
            </View>
        </View>
        }
    </>
  )
}