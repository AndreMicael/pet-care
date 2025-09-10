'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Heart, Calendar, Send, Info, Star } from 'lucide-react';
import { createBooking } from '../../hooks/useAPI';
import { ImageWithFallback } from '@/app/(components)/ImageWithFallback';
import { useRouter } from 'next/navigation';
import type { Caregiver } from '@/app/(components)/CaregiverList';

interface BookingFormProps {
  caregiver: Caregiver;
  onBack?: () => void;
  onSubmit?: (bookingData: BookingData) => void;
}

interface BookingData {
  caregiverId: string;
  petName: string;
  petType: string;
  petAge: string;
  serviceType: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  duration: string;
  specialRequirements: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  emergencyContact: string;
}

export default function BookingForm({ caregiver, onBack, onSubmit }: BookingFormProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    petAge: '',
    serviceType: '',
    duration: '',
    specialRequirements: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    emergencyContact: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const bookingData: BookingData = {
        caregiverId: caregiver.id,
        petName: formData.petName,
        petType: formData.petType,
        petAge: formData.petAge,
        serviceType: formData.serviceType,
        startDate,
        endDate,
        duration: formData.duration,
        specialRequirements: formData.specialRequirements,
        ownerName: formData.ownerName,
        ownerPhone: formData.ownerPhone,
        ownerEmail: formData.ownerEmail,
        emergencyContact: formData.emergencyContact
      };

      const response = await createBooking(bookingData);
      
      if (response.success) {
        if (onSubmit) {
          onSubmit(bookingData);
        } else {
          // Construir URL com parâmetros de query
          const params = new URLSearchParams({
            petName: formData.petName,
            petType: formData.petType,
            petAge: formData.petAge,
            serviceType: formData.serviceType,
            duration: formData.duration,
            specialRequirements: formData.specialRequirements,
            ownerName: formData.ownerName,
            ownerPhone: formData.ownerPhone,
            ownerEmail: formData.ownerEmail,
            emergencyContact: formData.emergencyContact,
            startDate: startDate ? startDate.toISOString() : '',
            endDate: endDate ? endDate.toISOString() : ''
          });
          
          router.push(`/buscar-cuidador/${caregiver.id}/confirmacao?${params.toString()}`);
        }
      } else {
        console.error('Failed to create booking:', response.error);
        alert('Erro ao enviar solicitação. Tente novamente.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="w-full">
      {/* Mobile Layout */}
      <div className="lg:hidden bg-white min-h-screen p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5 text-[#4f30cb]" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-800 ml-4">
            Solicitar Agendamento
          </h1>
        </div>

        {/* Caregiver Info Card */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <ImageWithFallback
                src={caregiver.image}
                alt={caregiver.name}
                className="w-16 h-16 bg-gray-200 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-[#4f30cb]">{caregiver.name}</h3>
                <p className="text-sm text-gray-600">{caregiver.type}</p>
                <p className="text-sm font-semibold text-green-600">{caregiver.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pet Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-[#4f30cb] flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Informações do Pet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="petName">Nome do Pet *</Label>
                <Input
                  id="petName"
                  value={formData.petName}
                  onChange={(e) => handleInputChange('petName', e.target.value)}
                  placeholder="Ex: Rex, Mia..."
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="petType">Tipo de Pet *</Label>
                <Select onValueChange={(value) => handleInputChange('petType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Cachorro</SelectItem>
                    <SelectItem value="cat">Gato</SelectItem>
                    <SelectItem value="bird">Pássaro</SelectItem>
                    <SelectItem value="rabbit">Coelho</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="petAge">Idade do Pet</Label>
                <Input
                  id="petAge"
                  value={formData.petAge}
                  onChange={(e) => handleInputChange('petAge', e.target.value)}
                  placeholder="Ex: 2 anos, 6 meses..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-[#4f30cb] flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Detalhes do Serviço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="serviceType">Tipo de Serviço *</Label>
                <Select onValueChange={(value) => handleInputChange('serviceType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daycare">Day Care</SelectItem>
                    <SelectItem value="overnight">Hospedagem</SelectItem>
                    <SelectItem value="walk">Passeio</SelectItem>
                    <SelectItem value="visit">Visita em Casa</SelectItem>
                    <SelectItem value="medication">Aplicação de Medicação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Data de Início *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate ? startDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : undefined)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">Data de Término</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate ? endDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : undefined)}
                    min={startDate ? startDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="duration">Duração do Serviço</Label>
                <Select onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a duração" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Meio período (manhã)</SelectItem>
                    <SelectItem value="afternoon">Meio período (tarde)</SelectItem>
                    <SelectItem value="fullday">Período integral</SelectItem>
                    <SelectItem value="overnight">Pernoite</SelectItem>
                    <SelectItem value="weekend">Final de semana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specialRequirements">Necessidades Especiais</Label>
                <Textarea
                  id="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  placeholder="Descreva medicações, alimentação especial, comportamentos, etc."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-[#4f30cb] flex items-center gap-2">
                <Info className="w-4 h-4" />
                Seus Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ownerName">Nome Completo *</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div>
                <Label htmlFor="ownerPhone">Telefone *</Label>
                <Input
                  id="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                  placeholder="(XX) XXXXX-XXXX"
                  required
                />
              </div>

              <div>
                <Label htmlFor="ownerEmail">E-mail *</Label>
                <Input
                  id="ownerEmail"
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="Nome e telefone para emergências"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#4f30cb] hover:bg-[#4527a8] text-white py-3 font-semibold disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar Solicitação
              </>
            )}
          </Button>

          <p className="text-sm text-gray-600 text-center">
            Sua solicitação será enviada para {caregiver.name} e você receberá uma resposta em até 24 horas.
          </p>
        </form>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#4f30cb] font-fredoka mb-2">
            Solicitar Agendamento
          </h1>
          <p className="text-gray-600">
            Preencha o formulário abaixo para solicitar os serviços de cuidado para seu pet
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Caregiver Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className="mb-6">
                <CardContent className="p-5">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={caregiver.image}
                        alt={caregiver.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-[#4f30cb] font-fredoka mb-1">
                      {caregiver.name}
                    </h3>
                    <p className="text-gray-600 mb-2 text-sm">{caregiver.type}</p>
                    <div className="text-xl font-bold text-green-600 mb-3">
                      {caregiver.price}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-600 text-sm">
                        {caregiver.rating || 5.0} ({caregiver.reviews || 0})
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">O que acontece depois?</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <span className="bg-[#4f30cb] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">1</span>
                    <span>Enviamos sua solicitação para {caregiver.name}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-[#4f30cb] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">2</span>
                    <span>O cuidador analisa e responde em até 24h</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-[#4f30cb] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">3</span>
                    <span>Vocês combinam os detalhes finais</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pet Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#4f30cb] flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Informações do Pet
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="petName">Nome do Pet *</Label>
                    <Input
                      id="petName"
                      value={formData.petName}
                      onChange={(e) => handleInputChange('petName', e.target.value)}
                      placeholder="Ex: Rex, Mia..."
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="petType">Tipo de Pet *</Label>
                    <Select onValueChange={(value) => handleInputChange('petType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Cachorro</SelectItem>
                        <SelectItem value="cat">Gato</SelectItem>
                        <SelectItem value="bird">Pássaro</SelectItem>
                        <SelectItem value="rabbit">Coelho</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="petAge">Idade do Pet</Label>
                    <Input
                      id="petAge"
                      value={formData.petAge}
                      onChange={(e) => handleInputChange('petAge', e.target.value)}
                      placeholder="Ex: 2 anos, 6 meses..."
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Service Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#4f30cb] flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Detalhes do Serviço
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="serviceType">Tipo de Serviço *</Label>
                    <Select onValueChange={(value) => handleInputChange('serviceType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daycare">Day Care</SelectItem>
                        <SelectItem value="overnight">Hospedagem</SelectItem>
                        <SelectItem value="walk">Passeio</SelectItem>
                        <SelectItem value="visit">Visita em Casa</SelectItem>
                        <SelectItem value="medication">Aplicação de Medicação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Data de Início *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate ? startDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : undefined)}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="endDate">Data de Término</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={endDate ? endDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : undefined)}
                        min={startDate ? startDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duração do Serviço</Label>
                    <Select onValueChange={(value) => handleInputChange('duration', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione a duração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Meio período (manhã)</SelectItem>
                        <SelectItem value="afternoon">Meio período (tarde)</SelectItem>
                        <SelectItem value="fullday">Período integral</SelectItem>
                        <SelectItem value="overnight">Pernoite</SelectItem>
                        <SelectItem value="weekend">Final de semana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="specialRequirements">Necessidades Especiais</Label>
                    <Textarea
                      id="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                      placeholder="Descreva medicações, alimentação especial, comportamentos, etc."
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Owner Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#4f30cb] flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Seus Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ownerName">Nome Completo *</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      placeholder="Seu nome completo"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="ownerPhone">Telefone *</Label>
                    <Input
                      id="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                      placeholder="(XX) XXXXX-XXXX"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="ownerEmail">E-mail *</Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                      placeholder="seu@email.com"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      placeholder="Nome e telefone para emergências"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#4f30cb] hover:bg-[#4527a8] text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Solicitação
                    </>
                  )}
                </Button>

                <p className="text-gray-600 mt-3 text-sm max-w-md mx-auto">
                  Sua solicitação será enviada para {caregiver.name} e você receberá uma resposta em até 24 horas.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { BookingData };
