<?php

namespace App\Filament\Resources\SectionResource\RelationManagers;

use App\Enums\LessonType;
use App\Enums\VideoType;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Actions;

class LessonsRelationManager extends RelationManager
{
    protected static string $relationship = 'lessons';
    protected static ?string $title = 'Lecciones';

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')->label('Título')->required()->columnSpanFull(),
            TextInput::make('order')->label('Orden')->integer()->default(0),
            Select::make('type')
                ->label('Tipo')
                ->options(LessonType::class)
                ->required()
                ->live(),

            // Selector de origen del video
            Select::make('video_type')
                ->label('Origen del video')
                ->options(VideoType::class)
                ->nullable()
                ->visible(fn ($get) => self::isVideoType($get('type')))
                ->live(),

            // URL externa (YouTube, Vimeo, etc.)
            TextInput::make('video_url')
                ->label('URL del video')
                ->url()
                ->nullable()
                ->visible(fn ($get) => self::isVideoType($get('type')) && self::isVideoTypeValue($get('video_type'), VideoType::Url))
                ->columnSpanFull(),

            // Bunny Stream GUID
            TextInput::make('video_path')
                ->label('GUID del video en Bunny Stream')
                ->placeholder('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
                ->nullable()
                ->visible(fn ($get) => self::isVideoType($get('type')) && self::isVideoTypeValue($get('video_type'), VideoType::Bunny))
                ->columnSpanFull()
                ->helperText('Copia el Video GUID desde el dashboard de Bunny Stream.'),

            // Archivo local (temporal / desarrollo)
            FileUpload::make('video_path')
                ->label('Archivo de video (local)')
                ->disk('public')
                ->directory('lessons/videos')
                ->acceptedFileTypes(['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'])
                ->maxSize(512 * 1024)
                ->nullable()
                ->visible(fn ($get) => self::isVideoType($get('type')) && self::isVideoTypeValue($get('video_type'), VideoType::Upload))
                ->columnSpanFull(),

            TextInput::make('duration_seconds')
                ->label('Duración (segundos)')
                ->integer()
                ->nullable()
                ->visible(fn ($get) => self::isVideoType($get('type'))),

            RichEditor::make('content')
                ->label('Contenido')
                ->nullable()
                ->visible(fn ($get) => ! self::isVideoType($get('type')))
                ->columnSpanFull(),

            Toggle::make('is_free_preview')->label('Vista previa gratuita'),
        ]);
    }

    private static function isVideoType(mixed $type): bool
    {
        if ($type instanceof LessonType) {
            return $type === LessonType::Video;
        }
        return $type === LessonType::Video->value;
    }

    private static function isVideoTypeValue(mixed $videoType, VideoType $expected): bool
    {
        if ($videoType instanceof VideoType) {
            return $videoType === $expected;
        }
        return $videoType === $expected->value;
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        return $this->normalizeVideoData($data);
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        return $this->normalizeVideoData($data);
    }

    private function normalizeVideoData(array $data): array
    {
        // video_type ya viene explícito del Select — solo limpiar campos no usados
        $videoType = $data['video_type'] ?? null;

        if ($videoType === VideoType::Bunny->value || $videoType === VideoType::Bunny) {
            $data['video_url'] = null;
        } elseif ($videoType === VideoType::Url->value || $videoType === VideoType::Url) {
            $data['video_path'] = null;
        } elseif ($videoType === VideoType::Upload->value || $videoType === VideoType::Upload) {
            $data['video_url'] = null;
        }

        return $data;
    }

    public function table(Table $table): Table
    {
        return $table
            ->headerActions([
                Actions\CreateAction::make(),
            ])
            ->reorderable('order')
            ->columns([
                TextColumn::make('order')->label('#')->sortable(),
                TextColumn::make('title')->label('Título')->searchable()->limit(40),
                TextColumn::make('type')->label('Tipo')->badge(),
                TextColumn::make('video_type')->label('Video')->badge()->placeholder('—'),
                TextColumn::make('duration_seconds')->label('Duración')->suffix('s')->placeholder('—'),
                IconColumn::make('is_free_preview')->label('Preview gratuito')->boolean(),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
