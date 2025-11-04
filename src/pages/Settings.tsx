import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Settings = () => {
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([1000]);
  const [topK, setTopK] = useState([5]);
  const [streaming, setStreaming] = useState(true);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful AI assistant that answers questions based on the provided documents. Always cite your sources and provide accurate information."
  );

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  const handleResetSettings = () => {
    setModel("gpt-3.5-turbo");
    setTemperature([0.7]);
    setMaxTokens([1000]);
    setTopK([5]);
    setStreaming(true);
    setSystemPrompt(
      "You are a helpful AI assistant that answers questions based on the provided documents. Always cite your sources and provide accurate information."
    );
    toast.success("Settings reset to defaults");
  };

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your AI assistant and preferences
          </p>
        </div>

        {/* Model Settings */}
        <Card className="p-6 gradient-card border-border/50 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Model Configuration</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="model">AI Model</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger id="model" className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                  <SelectItem value="local-llama">Local Llama 2</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose the AI model for generating responses
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">
                Temperature: {temperature[0].toFixed(1)}
              </Label>
              <Slider
                id="temperature"
                min={0}
                max={1}
                step={0.1}
                value={temperature}
                onValueChange={setTemperature}
                className="py-4"
              />
              <p className="text-xs text-muted-foreground">
                Higher values make output more random, lower values more
                deterministic
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-tokens">Max Tokens: {maxTokens[0]}</Label>
              <Slider
                id="max-tokens"
                min={100}
                max={4000}
                step={100}
                value={maxTokens}
                onValueChange={setMaxTokens}
                className="py-4"
              />
              <p className="text-xs text-muted-foreground">
                Maximum length of the generated response
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="top-k">
                Retrieved Chunks: {topK[0]}
              </Label>
              <Slider
                id="top-k"
                min={1}
                max={10}
                step={1}
                value={topK}
                onValueChange={setTopK}
                className="py-4"
              />
              <p className="text-xs text-muted-foreground">
                Number of document chunks to retrieve for each query
              </p>
            </div>
          </div>
        </Card>

        {/* System Prompt */}
        <Card className="p-6 gradient-card border-border/50 shadow-md">
          <h2 className="text-xl font-semibold mb-4">System Prompt</h2>
          <div className="space-y-2">
            <Label htmlFor="system-prompt">Custom Instructions</Label>
            <Textarea
              id="system-prompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={6}
              className="rounded-xl"
            />
            <p className="text-xs text-muted-foreground">
              Customize how the AI assistant behaves and responds to queries
            </p>
          </div>
        </Card>

        {/* UI Preferences */}
        <Card className="p-6 gradient-card border-border/50 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Interface Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="streaming">Streaming Responses</Label>
                <p className="text-xs text-muted-foreground">
                  Show responses as they are generated
                </p>
              </div>
              <Switch
                id="streaming"
                checked={streaming}
                onCheckedChange={setStreaming}
              />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleResetSettings}
            className="rounded-xl"
          >
            Reset to Defaults
          </Button>
          <Button
            onClick={handleSaveSettings}
            className="gradient-primary rounded-xl shadow-glow"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
