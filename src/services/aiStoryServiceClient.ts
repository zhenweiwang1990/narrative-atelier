import { v4 as uuidv4 } from 'uuid';
import { Story } from '@/utils/types';

// Define the API endpoints
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const API_ENDPOINTS = {
  GENERATE_STORY: `${API_BASE_URL}/api/ai/generate-story`,
  GENERATE_SCENE: `${API_BASE_URL}/api/ai/generate-scene`,
  GENERATE_CHARACTER: `${API_BASE_URL}/api/ai/generate-character`,
  GENERATE_LOCATION: `${API_BASE_URL}/api/ai/generate-location`,
  TASK_STATUS: `${API_BASE_URL}/api/ai/task-status`,
};

// Define the task types
export type TaskType = 'story' | 'scene' | 'character' | 'location';

// Define the task status
export type TaskStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Define the task result
export interface TaskResult {
  id: string;
  type: TaskType;
  status: TaskStatus;
  progress?: number;
  error?: string;
  files?: string[];
  data?: any;
}

// Define the client class
class AIStoryServiceClient {
  private tasks: Map<string, TaskResult> = new Map();
  private pollingInterval: number | null = null;

  // Start polling for task status
  private startPolling() {
    if (this.pollingInterval !== null) return;

    this.pollingInterval = window.setInterval(async () => {
      const pendingTasks = Array.from(this.tasks.values()).filter(
        task => task.status === 'pending' || task.status === 'processing'
      );

      if (pendingTasks.length === 0) {
        this.stopPolling();
        return;
      }

      try {
        const taskIds = pendingTasks.map(task => task.id);
        const response = await fetch(API_ENDPOINTS.TASK_STATUS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ taskIds }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results: TaskResult[] = await response.json();
        
        // Update the tasks with the new status
        results.forEach(result => {
          const result = results.find(r => r.id === taskId);
          if (result !== null && result !== undefined) {
            const hasFiles = result.files && result.files.length > 0;
            console.log(`Result for task ${taskId} received: ${result.status}, hasFiles: ${hasFiles}`);
            this.tasks.set(result.id, result);
          }
        });
      } catch (error) {
        console.error('Error polling for task status:', error);
      }
    }, 2000);
  }

  // Stop polling for task status
  private stopPolling() {
    if (this.pollingInterval !== null) {
      window.clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  // Generate a story
  async generateStory(prompt: string): Promise<string> {
    const taskId = uuidv4();
    this.tasks.set(taskId, {
      id: taskId,
      type: 'story',
      status: 'pending',
    });

    try {
      const response = await fetch(API_ENDPOINTS.GENERATE_STORY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.startPolling();
      return taskId;
    } catch (error) {
      this.tasks.set(taskId, {
        id: taskId,
        type: 'story',
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  // Generate a scene
  async generateScene(storyId: string, prompt: string): Promise<string> {
    const taskId = uuidv4();
    this.tasks.set(taskId, {
      id: taskId,
      type: 'scene',
      status: 'pending',
    });

    try {
      const response = await fetch(API_ENDPOINTS.GENERATE_SCENE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, storyId, prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.startPolling();
      return taskId;
    } catch (error) {
      this.tasks.set(taskId, {
        id: taskId,
        type: 'scene',
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  // Generate a character
  async generateCharacter(storyId: string, prompt: string): Promise<string> {
    const taskId = uuidv4();
    this.tasks.set(taskId, {
      id: taskId,
      type: 'character',
      status: 'pending',
    });

    try {
      const response = await fetch(API_ENDPOINTS.GENERATE_CHARACTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, storyId, prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.startPolling();
      return taskId;
    } catch (error) {
      this.tasks.set(taskId, {
        id: taskId,
        type: 'character',
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  // Generate a location
  async generateLocation(storyId: string, prompt: string): Promise<string> {
    const taskId = uuidv4();
    this.tasks.set(taskId, {
      id: taskId,
      type: 'location',
      status: 'pending',
    });

    try {
      const response = await fetch(API_ENDPOINTS.GENERATE_LOCATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, storyId, prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.startPolling();
      return taskId;
    } catch (error) {
      this.tasks.set(taskId, {
        id: taskId,
        type: 'location',
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  // Get the task result
  getTaskResult(taskId: string): TaskResult | undefined {
    return this.tasks.get(taskId);
  }

  // Wait for the task to complete
  async waitForTask(taskId: string, timeout = 60000): Promise<TaskResult> {
    const startTime = Date.now();
    
    return new Promise((resolve, reject) => {
      const checkTask = () => {
        const task = this.tasks.get(taskId);
        
        if (!task) {
          reject(new Error(`Task ${taskId} not found`));
          return;
        }
        
        if (task.status === 'completed') {
          resolve(task);
          return;
        }
        
        if (task.status === 'failed') {
          reject(new Error(task.error || `Task ${taskId} failed`));
          return;
        }
        
        if (Date.now() - startTime > timeout) {
          reject(new Error(`Timeout waiting for task ${taskId}`));
          return;
        }
        
        setTimeout(checkTask, 1000);
      };
      
      checkTask();
    });
  }

  // Process a novel into a story structure
  async processNovel(content: string): Promise<Story> {
    // This is a placeholder for the actual implementation
    // In a real implementation, this would send the novel to the server
    // and receive a structured story in return
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock response
        const mockStory: Story = {
          id: uuidv4(),
          title: "Generated from Novel",
          author: "AI Assistant",
          description: content.substring(0, 200) + "...",
          type: "interactive",
          scenes: [],
          characters: [],
          locations: [],
          globalValues: []
        };
        
        resolve(mockStory);
      }, 2000);
    });
  }
}

// Export a singleton instance
export const aiStoryService = new AIStoryServiceClient();
