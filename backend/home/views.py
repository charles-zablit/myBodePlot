from django.views.generic import TemplateView


class indexView(TemplateView):
		template_name = "home/index.html"

class manifestView(TemplateView):
		template_name = "home/manifest.json"
		content_type='application/manifest+json'

class swView(TemplateView):
		template_name = "home/sw.js"
		content_type='application/javascript'