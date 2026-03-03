import { ProfessionalCaseStudy } from '../contexts/PortfolioContext';

interface FeaturedProjectSettingsProps {
  formData: Partial<ProfessionalCaseStudy>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ProfessionalCaseStudy>>>;
}

export function FeaturedProjectSettings({ formData, setFormData }: FeaturedProjectSettingsProps) {
  return (
    <div className="space-y-4 pl-4 pt-2">
      {/* Featured Toggle */}
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Show in Featured Projects
          </label>
          <p className="text-xs text-gray-500">Display this case study on the homepage</p>
        </div>
        <button
          onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            formData.featured !== false ? 'bg-purple-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              formData.featured !== false ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Button Visibility */}
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Show "View Case Study" Button
          </label>
          <p className="text-xs text-gray-500">Enable/disable the button on the featured card</p>
        </div>
        <button
          onClick={() => setFormData(prev => ({ ...prev, featuredButtonVisible: !prev.featuredButtonVisible }))}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            formData.featuredButtonVisible !== false ? 'bg-purple-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              formData.featuredButtonVisible !== false ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Button Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Button Text
        </label>
        <input
          type="text"
          value={formData.featuredButtonText || 'View Case Study'}
          onChange={(e) => setFormData(prev => ({ ...prev, featuredButtonText: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="e.g., View Case Study, Learn More, See Details"
        />
      </div>

      {/* Featured Order */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Display Order
        </label>
        <input
          type="number"
          value={formData.featuredOrder || 0}
          onChange={(e) => setFormData(prev => ({ ...prev, featuredOrder: parseInt(e.target.value) || 0 }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="0"
          min="0"
        />
        <p className="text-xs text-gray-500 mt-1">Lower numbers appear first (0 = highest priority)</p>
      </div>
    </div>
  );
}
