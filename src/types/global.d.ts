export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          query_id?: string; // Уникальный идентификатор запроса
          user?: {
            id: number; // Уникальный идентификатор пользователя
            first_name: string; // Имя пользователя
            last_name?: string; // Фамилия пользователя
            username?: string; // Юзернейм пользователя
            language_code?: string; // Код языка пользователя (например, "en" или "ru")
          };
          chat?: {
            id: number; // Уникальный идентификатор чата
            type: string; // Тип чата ("private", "group", "supergroup", "channel")
            title?: string; // Название чата
            username?: string; // Юзернейм чата
          };
          can_send_after?: number; // UNIX timestamp, после которого можно отправлять сообщения от имени бота
          auth_date: number; // UNIX timestamp, когда пользователь был авторизован
          hash: string; // Подпись данных для проверки подлинности
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
        ready: () => void; // Добавляем метод ready
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
      };
    };
  }
}
