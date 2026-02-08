import React from 'react';
import { SafeAreaView, View, Text, FlatList, Button } from 'react-native';
import { useLiveFeed } from './src/state/useLiveFeed';

export default function App() {
  const { lives, joinLive } = useLiveFeed();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#09090b' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: '700' }}>Whatt Live</Text>
        <Text style={{ color: '#a1a1aa', marginBottom: 12 }}>Lives ativas e leilões em tempo real</Text>
        <FlatList
          data={lives}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: '#18181b', padding: 12, borderRadius: 10, marginBottom: 8 }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>{item.title}</Text>
              <Text style={{ color: '#d4d4d8' }}>Iniciou em: {item.startsAt}</Text>
              <Button title="Entrar na live" onPress={() => joinLive(item.id)} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
