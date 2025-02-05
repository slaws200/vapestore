export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          query_id?: string;
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
          chat?: {
            id: number;
            type: string;
            title?: string;
            username?: string;
          };
          can_send_after?: number;
          auth_date: number;
          hash: string;
        };
        version: string;
        platform: string;
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          accent_text_color?: string;
        };
        colorScheme: 'light' | 'dark';
        viewportHeight: number;
        isExpanded: boolean;
        ready: () => void;
        expand: () => void;
        close: () => void;
        requestFullscreen: () => void;
        disableVerticalSwipes: () => void;
        lockOrientation: () => void;
        sendData: (data: string) => void;
        onEvent: (eventType: string, callback: () => void) => void;
        offEvent: (eventType: string, callback: () => void) => void;
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        BackButton: {
          isVisible: boolean;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        PopupButton: {
          id: string;
          type: 'default' | 'destructive' | 'ok' | 'cancel';
          text: string;
        };
        openTelegramLink: (url: string) => void;

        /** 🔹 Показывает простое уведомление (alert) */
        showAlert: (message: string, callback?: () => void) => void;

        /** 🔹 Показывает подтверждающее окно с "OK" и "Cancel" */
        showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;

        /** 🔹 Показывает кастомный popup с кнопками */
        showPopup: (
          popupParams: {
            title?: string;
            message: string;
            buttons: { id: string; type: 'default' | 'destructive' | 'ok' | 'cancel'; text: string }[];
          },
          callback: (buttonId: string) => void
        ) => void;
      };
    };
  }
}
