import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-container">
      @for (notification of notifications(); track notification.id) {
        <div class="notification" [class]="'notification--' + notification.type" (click)="dismiss(notification.id)">
          <span class="notification__message">{{ notification.message }}</span>
          <button class="notification__close" (click)="dismiss(notification.id); $event.stopPropagation()">&times;</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .notifications-container {
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
      pointer-events: none;
    }

    .notification {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      pointer-events: auto;
      animation: slideIn 0.3s ease-out;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 14px;
      line-height: 1.4;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .notification--error {
      background-color: #fee2e2;
      border-left: 4px solid #dc2626;
      color: #991b1b;
    }

    .notification--success {
      background-color: #dcfce7;
      border-left: 4px solid #16a34a;
      color: #166534;
    }

    .notification--warning {
      background-color: #fef3c7;
      border-left: 4px solid #d97706;
      color: #92400e;
    }

    .notification--info {
      background-color: #e0f2fe;
      border-left: 4px solid #0284c7;
      color: #075985;
    }

    .notification__message {
      flex: 1;
      padding-right: 8px;
    }

    .notification__close {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      opacity: 0.6;
      padding: 0;
      line-height: 1;
      color: inherit;
    }

    .notification__close:hover {
      opacity: 1;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent {
  private notificationService = inject(NotificationService);

  notifications = this.notificationService.notifications;

  dismiss(id: string): void {
    this.notificationService.dismiss(id);
  }
}