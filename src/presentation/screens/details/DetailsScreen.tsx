import { useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { RootStackParams } from '../../navigation/Navigation';
import { useMovie } from '../../hooks/useMovie';
import { MovieHeader } from '../../components/movie/MovieHeader';
import { MovieDetails } from '../../components/movie/MovieDetails';
import { ScrollView } from 'react-native-gesture-handler';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}


export const DetailsScreen = ({route}:Props) => {
  const { movieId } = route.params;

  const { isLoading, movieData, cast = [] } = useMovie(movieId);

  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <ScrollView>
      {/* header */}
        <MovieHeader movie={movieData!} />
        {/* details */}
        <MovieDetails movie={movieData!} cast={cast} />
    </ScrollView>
  )
}
