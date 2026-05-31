<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SectionResource\Pages;
use App\Filament\Resources\SectionResource\RelationManagers\LessonsRelationManager;
use App\Models\Section;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Actions;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SectionResource extends Resource
{
    protected static ?string $model = Section::class;
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $modelLabel = 'Sección';
    protected static ?string $pluralModelLabel = 'Secciones';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')->label('Título')->required(),
            TextInput::make('order')->label('Orden')->integer()->default(0),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')->label('Título')->searchable(),
                TextColumn::make('order')->label('Orden')->sortable(),
            ])
            ->actions([
                Actions\EditAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            LessonsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSections::route('/'),
            'edit' => Pages\EditSection::route('/{record}/edit'),
        ];
    }
}
