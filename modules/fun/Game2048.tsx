import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanGestureHandler, Alert } from 'react-native';
import { useTheme } from '../../core/theme/ThemeContext';
import { showRewardedAd } from '../../core/admob/AdMobComponents';

type Board = number[][];

export const Game2048: React.FC = () => {
  const { effectiveTheme } = useTheme();
  const [board, setBoard] = useState<Board>(() => initializeBoard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  const isDark = effectiveTheme === 'dark';

  function initializeBoard(): Board {
    const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
  }

  function addRandomTile(board: Board) {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }
    
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[randomCell[0]][randomCell[1]] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  const resetGame = () => {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
  };

  const handleGameOver = () => {
    setGameOver(true);
    Alert.alert(
      'Game Over!',
      `Final Score: ${score}`,
      [
        { text: 'New Game', onPress: resetGame },
        { text: 'Watch Ad for Continue', onPress: () => showRewardedAd() },
      ]
    );
  };

  const getTileColor = (value: number) => {
    const colors: { [key: number]: string } = {
      0: isDark ? '#3a3a3c' : '#cdc1b4',
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e',
    };
    return colors[value] || '#3c3a32';
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>2048</Text>
        <Text style={[styles.score, { color: isDark ? '#fff' : '#333' }]}>
          Score: {score}
        </Text>
      </View>

      <View style={[styles.board, { backgroundColor: isDark ? '#2a2a2a' : '#bbada0' }]}>
        {board.map((row, i) =>
          row.map((cell, j) => (
            <View
              key={`${i}-${j}`}
              style={[
                styles.cell,
                { backgroundColor: getTileColor(cell) }
              ]}
            >
              {cell !== 0 && (
                <Text style={[
                  styles.cellText,
                  { color: cell > 4 ? '#fff' : '#776e65' }
                ]}>
                  {cell}
                </Text>
              )}
            </View>
          ))
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#8f7a66' }]}
        onPress={resetGame}
      >
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  score: {
    fontSize: 24,
    fontWeight: '600',
  },
  board: {
    width: 300,
    height: 300,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  cell: {
    width: 65,
    height: 65,
    borderRadius: 4,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
