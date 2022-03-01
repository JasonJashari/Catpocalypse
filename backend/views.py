from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from django.contrib.auth.models import User

from . import functions

################FOR AUTHENTICATION add this to class viewset
# permission_classes = [IsAuthenticated]
# authentication_classes = (TokenAuthentication,)

# Import Models here (if necessary)
from .models import ExampleModel

# Import Serializers here
from .serializers import ExampleSerializer, ExampleSerializer2# , GetCatSerialiser
from .serializers import UserSerializer

# -----------------------------
# Create your api views here. 
# -----------------------------
# (Ideally each API view should have a specific purpose
# such as getting a specific request, or checking some-
# thing specific)
# These are just example boilerplate, add and remove to 
# your will
# -----------------------------

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def test(request): #REMOVE THIS (FROM NISHIL)
    val = functions.capacity_check()
    html = "<html><body>It is now %s</body></html>" % val
    return HttpResponse(html)


# Premade Views (mostly for debug)
class ExampleAPIListView(generics.ListAPIView):
    queryset = ExampleModel.objects.all() # What we want to return (All the objects)
    serializer_class = ExampleSerializer # What is our serialiser (handles the actual json parsing)
    
class ExampleAPICreateView(generics.CreateAPIView):
    queryset = ExampleModel.objects.all() # What we want to return (All the objects)
    serializer_class = ExampleSerializer # What is our serialiser (handles the actual json parsing)
        
# Add your APIViews here     
class ExampleAPIGETView(APIView):
    serializer_class = ExampleSerializer2
    def get(self, request, format=None):
        code = request.GET.get("hat")
        pass

class ExampleAPIPOSTView(APIView):
    serializer_class = ExampleSerializer
    def post(self, request, format=None):
        # Add functionality here
        pass 

'''class GetCatView(APIView):
    def get(self, request, format=None):
        lvlParameter = request.GET.get("level")
        if lvlParameter != None:
            returnedCats = Cat.objects.filter(level=lvlParameter)
            if len(returnedCats) > 0:
                #serialise room and get data
                data = GetCatSerialiser(returnedCats[0]).data
                return Response(data,status=status.HTTP_200_OK)
            
            return Response({'Error':'Bas request'},status=status.HTTP_400_BAD_REQUEST)
        return Response({'Error':'Bas request'},status=status.HTTP_400_BAD_REQUEST)'''