import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonButton,
  IonButtons,
  IonIcon,
  IonBadge,
  IonModal,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { addIcons } from 'ionicons';
import {
  playOutline,
  pauseOutline,
  refreshOutline,
  settingsOutline,
  trophyOutline,
  timerOutline,
  flameOutline,
  star,
  checkmarkCircleOutline,
  closeCircleOutline,
  pawOutline,
  footballOutline,
  filmOutline,
  fastFoodOutline,
  carSportOutline,
  gameControllerOutline,
  leafOutline,
  addCircleOutline,
  colorPaletteOutline,
  sparklesOutline,
  statsChartOutline,
  hourglassOutline,
  personCircleOutline,
  podiumOutline,
  timeOutline,
  calendarOutline,
  chevronUpOutline,
  personAddOutline,
  checkmarkOutline,
  trashOutline,
  arrowUpCircleOutline,
  medalOutline,
} from 'ionicons/icons';

export type Card = {
  id: number;
  key: string;
  emoji: string;
  revealed: boolean;
  matched: boolean;
  isShaking?: boolean;
};

export interface ThemeCategory {
  id: string;
  name: string;
  icon: string;
  emojiIcon: string;
  cardBackEmoji: string;
  color: string;
  gradient: string;
  emojis: string[];
}

export interface DifficultyLevel {
  id: 'easy' | 'medium' | 'hard';
  name: string;
  pairs: number;
  columns: number;
  defaultAttempts: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

export interface GameHistoryEntry {
  id: string;
  userName: string;
  userAvatar: string;
  themeName: string;
  themeEmoji: string;
  difficulty: string;
  attempts: number;
  timeSeconds: number;
  formattedTime: string;
  dateIso: string;
  dateFormatted: string;
  won: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonBadge,
    IonModal,
    IonCard,
    IonItem,
    IonLabel,
    IonInput,
    IonToggle,
    IonProgressBar,
    IonSegment,
    IonSegmentButton,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  // Gestión de Usuarios (Sin contraseña)
  users: UserProfile[] = [];
  currentUser: UserProfile = {
    id: 'u1',
    name: 'Nicolas Nieto Daza',
    avatar: '🦊',
    createdAt: new Date().toISOString(),
  };
  showUserModal = false;
  newUserName = '';
  selectedAvatar = '🦊';
  availableAvatars: string[] = ['🦊', '🦁', '🐼', '🐯', '🐶', '🐱', '🐰', '🐨', '🚀', '👑', '⚽', '🎮', '🏎️', '🍕', '🌟'];

  // Historial de Partidas y Bottom Sheet
  gameHistory: GameHistoryEntry[] = [];
  showHistorySheet = false;
  historySegment: 'history' | 'ranking' = 'history';
  // Temáticas disponibles con paleta cálida, blanca y beige
  themes: ThemeCategory[] = [
    {
      id: 'animals',
      name: 'Animales',
      icon: 'paw-outline',
      emojiIcon: '🐶',
      cardBackEmoji: '🐾',
      color: '#c99a4e',
      gradient: 'linear-gradient(135deg, #edd6b1 0%, #c99a4e 100%)',
      emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🦁', '🐯', '🐨', '🐸', '🐵', '🦄', '🐙', '🦉'],
    },
    {
      id: 'sports',
      name: 'Deportes & Fútbol',
      icon: 'football-outline',
      emojiIcon: '⚽',
      cardBackEmoji: '🏆',
      color: '#65a378',
      gradient: 'linear-gradient(135deg, #cde3d1 0%, #65a378 100%)',
      emojis: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🎱', '🏓', '🥊', '🏆', '🥇', '🥋', '🚴', '🛹', '🎳', '🏎️'],
    },
    {
      id: 'movies',
      name: 'Películas & Cine',
      icon: 'film-outline',
      emojiIcon: '🎬',
      cardBackEmoji: '🌟',
      color: '#9f82c4',
      gradient: 'linear-gradient(135deg, #ded0ee 0%, #9f82c4 100%)',
      emojis: ['🎬', '🍿', '🎥', '🎭', '🦸', '🧙', '🚀', '🤖', '🧟', '🦖', '👑', '🛸', '👻', '⚔️', '👾', '🧛'],
    },
    {
      id: 'food',
      name: 'Comida & Snacks',
      icon: 'fast-food-outline',
      emojiIcon: '🍕',
      cardBackEmoji: '🍽️',
      color: '#d67969',
      gradient: 'linear-gradient(135deg, #f7cdc4 0%, #d67969 100%)',
      emojis: ['🍕', '🍔', '🍟', '🌭', '🥪', '🌮', '🍣', '🍩', '🍦', '🍪', '🍓', '🥑', '🥞', '🥐', '🧁', '🍉'],
    },
    {
      id: 'vehicles',
      name: 'Vehículos & Viajes',
      icon: 'car-sport-outline',
      emojiIcon: '🚗',
      cardBackEmoji: '🧭',
      color: '#5b9fad',
      gradient: 'linear-gradient(135deg, #cbe3e8 0%, #5b9fad 100%)',
      emojis: ['🚗', '✈️', '🚀', '🚢', '🚁', '🚂', '🏎️', '🏍️', '🚲', '🛸', '🚜', '⛵', '🚆', '🚕', '🚌', '🛵'],
    },
    {
      id: 'games',
      name: 'Videojuegos & Geek',
      icon: 'game-controller-outline',
      emojiIcon: '🎮',
      cardBackEmoji: '✨',
      color: '#7b79be',
      gradient: 'linear-gradient(135deg, #d3d1f0 0%, #7b79be 100%)',
      emojis: ['🎮', '🕹️', '👾', '🎯', '🎲', '🧩', '⚔️', '🛡️', '💎', '🔮', '💣', '🧪', '🏹', '👑', '🗿', '🪙'],
    },
    {
      id: 'nature',
      name: 'Naturaleza & Flores',
      icon: 'leaf-outline',
      emojiIcon: '🌸',
      cardBackEmoji: '🍀',
      color: '#5eaba0',
      gradient: 'linear-gradient(135deg, #cdebe5 0%, #5eaba0 100%)',
      emojis: ['🌸', '🌻', '🌲', '🌵', '🌴', '🍀', '🍁', '🍄', '🌈', '🌊', '⚡', '☀️', '🌺', '🌷', '🌿', '🌱'],
    },
  ];

  // Dificultades
  difficulties: DifficultyLevel[] = [
    { id: 'easy', name: 'Fácil (3x4)', pairs: 6, columns: 3, defaultAttempts: 12 },
    { id: 'medium', name: 'Medio (4x4)', pairs: 8, columns: 4, defaultAttempts: 16 },
    { id: 'hard', name: 'Difícil (4x6)', pairs: 12, columns: 4, defaultAttempts: 24 },
  ];

  // Opciones de configuración
  selectedThemeId = 'animals';
  selectedDifficulty: 'easy' | 'medium' | 'hard' = 'medium';
  enableMaxAttempts = true;
  maxAttempts = 16;
  enableTimeLimit = false;
  timeLimitSeconds = 60;

  // Estado del juego
  cards: Card[] = [];
  firstPick: Card | null = null;
  secondPick: Card | null = null;
  boardLocked = false;
  matches = 0;
  attempts = 0;
  score = 0;
  combo = 0;
  maxCombo = 0;
  bestScore = 0;

  // Temporizador
  timerSeconds = 0;
  timerInterval: any = null;
  isGameActive = false;
  isPaused = false;

  // Modales
  showSettingsModal = false;
  showEndModal = false;
  isWin = false;
  isGameOver = false;

  constructor() {
    addIcons({
      playOutline,
      pauseOutline,
      refreshOutline,
      settingsOutline,
      trophyOutline,
      timerOutline,
      flameOutline,
      star,
      checkmarkCircleOutline,
      closeCircleOutline,
      pawOutline,
      footballOutline,
      filmOutline,
      fastFoodOutline,
      carSportOutline,
      gameControllerOutline,
      leafOutline,
      addCircleOutline,
      colorPaletteOutline,
      sparklesOutline,
      statsChartOutline,
      hourglassOutline,
      personCircleOutline,
      podiumOutline,
      timeOutline,
      calendarOutline,
      chevronUpOutline,
      personAddOutline,
      checkmarkOutline,
      trashOutline,
      arrowUpCircleOutline,
      medalOutline,
    });
  }

  ngOnInit() {
    this.loadUsers();
    this.loadHistory();
    this.loadBestScore();
    this.newGame();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  get currentTheme(): ThemeCategory {
    return this.themes.find((t) => t.id === this.selectedThemeId) || this.themes[0];
  }

  get currentDifficulty(): DifficultyLevel {
    return (
      this.difficulties.find((d) => d.id === this.selectedDifficulty) ||
      this.difficulties[1]
    );
  }

  get totalPairs(): number {
    return this.currentDifficulty.pairs;
  }

  get attemptsProgress(): number {
    if (!this.enableMaxAttempts || this.maxAttempts <= 0) return 0;
    return Math.min(this.attempts / this.maxAttempts, 1);
  }

  get attemptsRemaining(): number {
    if (!this.enableMaxAttempts) return 999;
    return Math.max(0, this.maxAttempts - this.attempts);
  }

  get formattedTime(): string {
    const totalSec = this.enableTimeLimit
      ? Math.max(0, this.timeLimitSeconds - this.timerSeconds)
      : this.timerSeconds;
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Iniciar nueva partida
  newGame() {
    this.stopTimer();
    this.matches = 0;
    this.attempts = 0;
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.timerSeconds = 0;
    this.isGameActive = false;
    this.isPaused = false;
    this.isWin = false;
    this.isGameOver = false;
    this.showEndModal = false;
    this.resetPick();

    // Crear y barajar las cartas
    const theme = this.currentTheme;
    const count = this.totalPairs;
    const selected = theme.emojis.slice(0, count);

    const deck: Card[] = selected.flatMap((emoji, i) => [
      { id: i * 2, key: 'card_' + i, emoji, revealed: false, matched: false },
      { id: i * 2 + 1, key: 'card_' + i, emoji, revealed: false, matched: false },
    ]);

    // Barajado Fisher-Yates
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    this.cards = deck;
    this.loadBestScore();
    this.startTimer();
    this.triggerHaptic('light');
  }

  // Reiniciar misma configuración
  restartGame() {
    this.newGame();
  }

  // Temporizador
  startTimer() {
    this.stopTimer();
    this.isGameActive = true;
    this.isPaused = false;

    this.timerInterval = setInterval(() => {
      if (this.isPaused) return;

      this.timerSeconds++;

      // Si hay límite de tiempo y se agotó
      if (this.enableTimeLimit && this.timerSeconds >= this.timeLimitSeconds) {
        this.stopTimer();
        this.handleGameOver('¡Se ha terminado el tiempo!');
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.triggerHaptic('light');
  }

  // Clic en tarjeta
  onCardClick(card: Card) {
    if (
      card.revealed ||
      card.matched ||
      this.boardLocked ||
      this.isPaused ||
      this.isGameOver ||
      this.isWin
    ) {
      return;
    }

    this.triggerHaptic('light');
    card.revealed = true;

    if (!this.firstPick) {
      this.firstPick = card;
      return;
    }

    // Segundo intento
    this.secondPick = card;
    this.attempts++;
    this.boardLocked = true;

    const isMatch = this.firstPick.key === this.secondPick.key;

    if (isMatch) {
      this.handleMatch();
    } else {
      this.handleMismatch();
    }
  }

  // Pareja encontrada
  private handleMatch() {
    if (!this.firstPick || !this.secondPick) return;

    this.firstPick.matched = true;
    this.secondPick.matched = true;
    this.matches++;
    this.combo++;
    if (this.combo > this.maxCombo) this.maxCombo = this.combo;

    // Cálculo de puntos con combo
    const comboBonus = (this.combo - 1) * 50;
    this.score += 100 + comboBonus;

    this.triggerHaptic('success');
    this.resetPick();

    // Comprobar victoria
    if (this.matches === this.totalPairs) {
      this.handleWin();
    }
  }

  // Pareja incorrecta
  private handleMismatch() {
    const card1 = this.firstPick;
    const card2 = this.secondPick;
    this.combo = 0;
    this.score = Math.max(0, this.score - 10);

    // Animación de error
    if (card1) card1.isShaking = true;
    if (card2) card2.isShaking = true;

    this.triggerHaptic('warning');

    setTimeout(() => {
      if (card1 && card2) {
        card1.revealed = false;
        card2.revealed = false;
        card1.isShaking = false;
        card2.isShaking = false;
      }
      this.resetPick();

      // Comprobar si se acabaron los intentos
      if (this.enableMaxAttempts && this.attempts >= this.maxAttempts) {
        this.handleGameOver('¡Se han agotado tus intentos configurados!');
      }
    }, 850);
  }

  private resetPick() {
    this.firstPick = null;
    this.secondPick = null;
    this.boardLocked = false;
  }

  // Victoria
  private handleWin() {
    this.stopTimer();
    this.isWin = true;
    this.isGameOver = false;

    // Bonus por tiempo e intentos restantes
    const timeBonus = Math.max(0, 300 - this.timerSeconds * 2);
    const attemptsBonus = this.enableMaxAttempts
      ? Math.max(0, (this.maxAttempts - this.attempts) * 25)
      : 50;
    this.score += timeBonus + attemptsBonus;

    this.saveBestScore();
    this.recordGame(true);
    this.triggerHaptic('success');

    setTimeout(() => {
      this.showEndModal = true;
    }, 500);
  }

  // Derrota
  private handleGameOver(reason: string) {
    this.stopTimer();
    this.isGameOver = true;
    this.isWin = false;
    this.recordGame(false);
    this.triggerHaptic('error');

    setTimeout(() => {
      this.showEndModal = true;
    }, 400);
  }

  // Registrar Partida en Historial
  private recordGame(won: boolean) {
    const now = new Date();
    const entry: GameHistoryEntry = {
      id: now.getTime().toString(),
      userName: this.currentUser?.name || 'Jugador',
      userAvatar: this.currentUser?.avatar || '🦊',
      themeName: this.currentTheme.name,
      themeEmoji: this.currentTheme.emojiIcon,
      difficulty: this.currentDifficulty.name,
      attempts: this.attempts,
      timeSeconds: this.timerSeconds,
      formattedTime: this.formattedTime,
      dateIso: now.toISOString(),
      dateFormatted: `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${now.toLocaleDateString()}`,
      won,
    };

    // Agregar al principio (más reciente primero)
    this.gameHistory.unshift(entry);
    // Limitar a las últimas 50 partidas
    if (this.gameHistory.length > 50) {
      this.gameHistory = this.gameHistory.slice(0, 50);
    }
    this.saveHistory();
  }

  // Ranking / Tabla de Posiciones
  // Criterio 1: Menor número de intentos
  // Criterio 2 (Desempate): Menor tiempo empleado
  get leaderboard(): GameHistoryEntry[] {
    const wins = this.gameHistory.filter((g) => g.won);
    return wins.sort((a, b) => {
      if (a.attempts !== b.attempts) {
        return a.attempts - b.attempts;
      }
      return a.timeSeconds - b.timeSeconds;
    });
  }

  // Carga y guardado de Historial
  loadHistory() {
    try {
      const saved = localStorage.getItem('memograma_history');
      if (saved) {
        this.gameHistory = JSON.parse(saved);
      }
    } catch {
      this.gameHistory = [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem('memograma_history', JSON.stringify(this.gameHistory));
    } catch {
      // LocalStorage no disponible
    }
  }

  clearHistory() {
    this.gameHistory = [];
    try {
      localStorage.removeItem('memograma_history');
    } catch {}
    this.triggerHaptic('light');
  }

  openHistorySheet(tab: 'history' | 'ranking' = 'history') {
    this.historySegment = tab;
    this.showHistorySheet = true;
    this.triggerHaptic('light');
  }

  closeHistorySheet() {
    this.showHistorySheet = false;
  }

  // Gestión de Usuarios
  loadUsers() {
    try {
      const saved = localStorage.getItem('memograma_users');
      if (saved) {
        this.users = JSON.parse(saved);
      }
      if (!this.users || this.users.length === 0) {
        const defaultUser: UserProfile = {
          id: 'u1',
          name: 'Nicolas Nieto Daza',
          avatar: '🦊',
          createdAt: new Date().toISOString(),
        };
        this.users = [defaultUser];
        this.currentUser = defaultUser;
        this.saveUsers();
      } else {
        const activeId = localStorage.getItem('memograma_active_user_id');
        const active = this.users.find((u) => u.id === activeId);
        this.currentUser = active || this.users[0];
      }
    } catch {
      this.users = [
        {
          id: 'u1',
          name: 'Nicolas Nieto Daza',
          avatar: '🦊',
          createdAt: new Date().toISOString(),
        },
      ];
      this.currentUser = this.users[0];
    }
  }

  saveUsers() {
    try {
      localStorage.setItem('memograma_users', JSON.stringify(this.users));
      if (this.currentUser) {
        localStorage.setItem('memograma_active_user_id', this.currentUser.id);
      }
    } catch {}
  }

  openUserModal() {
    this.newUserName = '';
    this.selectedAvatar = '🦊';
    this.showUserModal = true;
    this.triggerHaptic('light');
  }

  closeUserModal() {
    this.showUserModal = false;
  }

  createUser() {
    const trimmed = this.newUserName.trim();
    if (!trimmed) return;

    const newUser: UserProfile = {
      id: 'u_' + Date.now(),
      name: trimmed,
      avatar: this.selectedAvatar,
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    this.saveUsers();
    this.showUserModal = false;
    this.triggerHaptic('success');
  }

  switchUser(user: UserProfile) {
    this.currentUser = user;
    this.saveUsers();
    this.showUserModal = false;
    this.triggerHaptic('light');
  }

  // Añadir intentos extra para continuar jugando
  addExtraAttempts(extra: number = 5) {
    this.maxAttempts += extra;
    this.isGameOver = false;
    this.showEndModal = false;
    this.startTimer();
    this.triggerHaptic('light');
  }

  // Ajustes
  openSettings() {
    this.isPaused = true;
    this.showSettingsModal = true;
    this.triggerHaptic('light');
  }

  closeSettings(applyChanges: boolean = false) {
    this.showSettingsModal = false;
    this.isPaused = false;
    if (applyChanges) {
      this.newGame();
    }
  }

  onDifficultyChange() {
    this.maxAttempts = this.currentDifficulty.defaultAttempts;
  }

  selectTheme(themeId: string) {
    this.selectedThemeId = themeId;
    this.triggerHaptic('light');
  }

  // Almacenamiento local de récords
  private getScoreKey(): string {
    return `memograma_best_${this.selectedThemeId}_${this.selectedDifficulty}`;
  }

  loadBestScore() {
    try {
      const saved = localStorage.getItem(this.getScoreKey());
      this.bestScore = saved ? parseInt(saved, 10) : 0;
    } catch {
      this.bestScore = 0;
    }
  }

  private saveBestScore() {
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      try {
        localStorage.setItem(this.getScoreKey(), this.bestScore.toString());
      } catch {
        // LocalStorage no disponible
      }
    }
  }

  private async triggerHaptic(type: 'light' | 'success' | 'warning' | 'error') {
    try {
      if (type === 'light') {
        await Haptics.impact({ style: ImpactStyle.Light });
      } else if (type === 'success') {
        await Haptics.notification({ type: NotificationType.Success });
      } else if (type === 'warning') {
        await Haptics.notification({ type: NotificationType.Warning });
      } else if (type === 'error') {
        await Haptics.notification({ type: NotificationType.Error });
      }
    } catch {
      // Ignorar si no está en dispositivo nativo
    }
  }
}