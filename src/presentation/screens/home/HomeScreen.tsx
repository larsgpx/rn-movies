import React from 'react'
import { Text, View } from 'react-native'
import { useMovies } from '../../hooks/useMovies';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PosterCarousel } from '../../components/movies/PosterCarousel';
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

export const HomeScreen = () => {
    const { top } = useSafeAreaInsets();
    const { isLoading, nowPlaying, upcoming, topRated, popular, popularNextPage } = useMovies();

    if (isLoading) {
        return <FullScreenLoader />
    }

    return (
        <ScrollView>
            <View style={{ marginTop: top + 20, paddingBottom: 30 }}>
                {/* Principal */}
                <PosterCarousel movies={nowPlaying} />

                {/* Populares */}
                <HorizontalCarousel movies={popular} title="Populares" loadNextPage={popularNextPage} />

                {/* Top Rated */}
                <HorizontalCarousel movies={topRated} title="Mejores calificadas" />

                {/* Upcoming */}
                <HorizontalCarousel movies={upcoming} title="Próximamente" />
            </View>
        </ScrollView>
    )
}
