// Global event emitter for artwork changes
class EventEmitter {
  constructor() {
    this.events = {};
  }

  emit(eventName, data) {
    console.log(`Emitting event: ${eventName}`, data);
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${eventName}:`, error);
        }
      });
    }
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    };
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }
  }

  // Remove all listeners for an event
  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }
}

// Create and export a global instance
export const globalEvents = new EventEmitter();

// Event types for artwork synchronization
export const ARTWORK_EVENTS = {
  CREATED: 'artwork:created',
  UPDATED: 'artwork:updated',
  DELETED: 'artwork:deleted',
  LIKED: 'artwork:liked',
  UNLIKED: 'artwork:unliked',
  BOOKMARKED: 'artwork:bookmarked',
  UNBOOKMARKED: 'artwork:unbookmarked',
  USER_STATS_UPDATED: 'user:stats:updated'
};

// Event types for event synchronization
export const EVENT_EVENTS = {
  CREATED: 'event:created',
  UPDATED: 'event:updated',
  DELETED: 'event:deleted',
  REGISTERED: 'event:registered',
  UNREGISTERED: 'event:unregistered',
  STATUS_CHANGED: 'event:status:changed'
};

export default globalEvents;
