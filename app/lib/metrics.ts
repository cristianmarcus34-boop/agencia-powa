// lib/metrics.ts
interface MetricsData {
  totalChats: number;
  totalMessages: number;
  cacheHits: number;
  cacheMisses: number;
  errors: number;
  responseTimes: number[];
  tokenUsage: {
    promptTokens: number;
    completionTokens: number;
    total: number;
  };
  userSatisfaction: number[];
  startTime: number;
}

export class MetricsService {
  private static instance: MetricsService;
  private metrics: MetricsData;

  private constructor() {
    this.metrics = {
      totalChats: 0,
      totalMessages: 0,
      cacheHits: 0,
      cacheMisses: 0,
      errors: 0,
      responseTimes: [],
      tokenUsage: {
        promptTokens: 0,
        completionTokens: 0,
        total: 0,
      },
      userSatisfaction: [],
      startTime: Date.now(),
    };
  }

  public static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();
    }
    return MetricsService.instance;
  }

  public recordChatStart(): void {
    this.metrics.totalChats++;
  }

  public recordMessage(): void {
    this.metrics.totalMessages++;
  }

  public recordCacheHit(): void {
    this.metrics.cacheHits++;
  }

  public recordCacheMiss(): void {
    this.metrics.cacheMisses++;
  }

  public recordResponseTime(time: number): void {
    this.metrics.responseTimes.push(time);
    if (this.metrics.responseTimes.length > 1000) {
      this.metrics.responseTimes = this.metrics.responseTimes.slice(-1000);
    }
  }

  public recordTokenUsage(promptTokens: number, completionTokens: number): void {
    this.metrics.tokenUsage.promptTokens += promptTokens;
    this.metrics.tokenUsage.completionTokens += completionTokens;
    this.metrics.tokenUsage.total += promptTokens + completionTokens;
  }

  public recordError(error: string): void {
    this.metrics.errors++;
    console.error('❌ Error registrado:', error);
  }

  public recordSatisfaction(rating: number): void {
    if (rating >= 1 && rating <= 5) {
      this.metrics.userSatisfaction.push(rating);
    }
  }

  public getMetrics(): MetricsData {
    return { ...this.metrics };
  }

  public getAverageResponseTime(): number {
    if (this.metrics.responseTimes.length === 0) return 0;
    const sum = this.metrics.responseTimes.reduce((a, b) => a + b, 0);
    return sum / this.metrics.responseTimes.length;
  }

  public getCacheHitRate(): number {
    const total = this.metrics.cacheHits + this.metrics.cacheMisses;
    if (total === 0) return 0;
    return (this.metrics.cacheHits / total) * 100;
  }

  public getAverageSatisfaction(): number {
    if (this.metrics.userSatisfaction.length === 0) return 0;
    const sum = this.metrics.userSatisfaction.reduce((a, b) => a + b, 0);
    return sum / this.metrics.userSatisfaction.length;
  }

  public reset(): void {
    this.metrics = {
      totalChats: 0,
      totalMessages: 0,
      cacheHits: 0,
      cacheMisses: 0,
      errors: 0,
      responseTimes: [],
      tokenUsage: { promptTokens: 0, completionTokens: 0, total: 0 },
      userSatisfaction: [],
      startTime: Date.now(),
    };
  }
}

export const metrics = MetricsService.getInstance();