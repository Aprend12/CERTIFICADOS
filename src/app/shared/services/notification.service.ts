import { Injectable, signal, computed } from '@angular/core';

export type NotificationType = 'error' | 'success' | 'warning' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly defaultDuration = 5000;
  private notificationList = signal<Notification[]>([]);
  private idCounter = 0;

  notifications = this.notificationList.asReadonly();

  show(message: string, type: NotificationType = 'error', duration?: number): string {
    const id = `notification-${++this.idCounter}`;
    const notification: Notification = {
      id,
      message,
      type,
      duration: duration ?? this.defaultDuration
    };

    this.notificationList.update(list => [...list, notification]);

    if (notification.duration && notification.duration > 0) {
      setTimeout(() => this.dismiss(id), notification.duration);
    }

    return id;
  }

  error(message: string, duration?: number): string {
    return this.show(message, 'error', duration);
  }

  success(message: string, duration?: number): string {
    return this.show(message, 'success', duration);
  }

  warning(message: string, duration?: number): string {
    return this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number): string {
    return this.show(message, 'info', duration);
  }

  dismiss(id: string): void {
    this.notificationList.update(list => list.filter(n => n.id !== id));
  }

  dismissAll(): void {
    this.notificationList.set([]);
  }
}