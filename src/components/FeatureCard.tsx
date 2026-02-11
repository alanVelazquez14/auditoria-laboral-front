export const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-background border border-gray-800 p-6 rounded-xl hover:border-purple-500/50 transition-colors">
    <div className="bg-purple-900/20 w-fit p-3 rounded-lg mb-4">
      <Icon className="text-purple-500" size={24} />
    </div>
    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);