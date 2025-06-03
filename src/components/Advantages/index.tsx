
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Brain, Code, Rocket } from "lucide-react";

const advantages = [
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "Быстро",
    description: "Создавайте приложения за секунды, а не дни"
  },
  {
    icon: <Brain className="h-8 w-8 text-purple-500" />,
    title: "Умно",
    description: "ИИ понимает ваши идеи и воплощает их в код"
  },
  {
    icon: <Code className="h-8 w-8 text-blue-500" />,
    title: "Качественно",
    description: "Чистый, современный код на React и TypeScript"
  },
  {
    icon: <Rocket className="h-8 w-8 text-green-500" />,
    title: "Легко",
    description: "Не нужны навыки программирования"
  }
];

const Advantages: React.FC = React.memo(() => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Почему выбирают easyappz?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Революционная платформа для создания приложений с помощью искусственного интеллекта
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">
                  {advantage.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

Advantages.displayName = 'Advantages';

export default Advantages;
